import { Input } from "antd";
import { useCallback, useMemo } from "react";
import { InputChangeEvent } from "types/events";
import { debounce } from "lodash";
import { useAppDispatch, useAppSelector } from "hooks";
import { changeSearch } from "store/slice";
import { fetchQuestions } from "store/thunks";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";

const SearchInput = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const { status } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const search = useAppSelector((state) => state.search);

  const fetchQuestionsBySearch = useMemo(
    () =>
      debounce((search: string) => {
        // get current query
        let currentQuery = {};

        if (params) {
          currentQuery = qs.parse(params.toString());
        }

        // update current query with search value
        const updatedQuery: any = {
          ...currentQuery,
          search: search || null,
        };

        const url = qs.stringifyUrl(
          {
            url: "/",
            query: updatedQuery,
          },
          { skipNull: true }
        );

        dispatch(fetchQuestions());
        navigate(url);
      }, 1000),
    []
  );

  const onChange = (e: InputChangeEvent) => {
    dispatch(changeSearch(e.target.value));
    fetchQuestionsBySearch(e.target.value);
  };

  return (
    <Input
      disabled={status === "loading"}
      placeholder="Введите свой вопрос"
      value={search}
      onChange={onChange}
    />
  );
};

export default SearchInput;
