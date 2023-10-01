import { QuestionsTable } from "components";
import SearchInput from "components/SearchInput";
import SearchSettings from "components/SearchSettings";
import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";
import { initApp } from "store/slice";
import { SortOrder, SortType } from "types/appSlice";
import { fetchQuestions } from "store/thunks";

const MainPage = () => {
  const dispatch = useAppDispatch();

  const [params] = useSearchParams();

  /**
   * here i get all the items and pass
   * it to table via props to avoid rerenders of the table
   */
  const {
    data,
    status,
    page,
    pageSize,
    search,
    sortOrder: order,
    sortType: sort,
  } = useAppSelector((state) => state);

  const navigate = useNavigate();

  /**
   * change url to store the query
   * so we can share the link with others
   * or use browser history to move between different queries
   * or save the link and come back to results later when we want
   * page is excluded since in has to be always 1 by default
   */
  useEffect(() => {
    // get current query
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // update current query with search value
    const updatedQuery: any = {
      ...currentQuery,
      sort,
      order,
      pageSize,
      search,
    };

    const url = qs.stringifyUrl({
      url: "/",
      query: updatedQuery,
    });

    navigate(url);

    // eslint-disable-next-line
  }, [navigate, pageSize, sort, order, params]);

  /**
   * take query from url if it exists
   * and put it to our state
   */
  useEffect(() => {
    const sortType = params.get("sort") as SortType | null;
    const sortOrder = params.get("order") as SortOrder | null;
    const pageSize = params.get("pageSize");
    const search = params.get("search");

    dispatch(
      initApp({
        sortType,
        sortOrder,
        pageSize: pageSize ? Number(pageSize) : null,
        search,
      })
    );

    if (search) {
      dispatch(fetchQuestions());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <SearchSettings />
      <SearchInput />
      <QuestionsTable
        data={data.items}
        status={status}
        page={page}
        pageSize={pageSize}
        total={data.total}
      />
    </div>
  );
};

export default MainPage;
