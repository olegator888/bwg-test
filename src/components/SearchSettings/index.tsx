import { Select } from "antd";
import { pageSizeOptions, sortOrderOptions, sortTypeOptions } from "./config";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  changePageSize,
  changeSortType,
  changeSortOrder,
  changePage,
} from "store/slice";
import { SortType, SortOrder } from "types/appSlice";
import { fetchQuestions } from "store/thunks";

const labelClassName = "flex flex-col gap-1 text-sm text-zinc-500";

const SearchSettings = () => {
  const dispatch = useAppDispatch();

  const { pageSize, sortType, sortOrder, status } = useAppSelector(
    (state) => state
  );

  const onPageSizeChange = (pageSize: number) => {
    dispatch(changePageSize(pageSize));
    dispatch(changePage(1));
    dispatch(fetchQuestions());
  };

  const onSortTypeChange = (sortType: SortType) => {
    dispatch(changeSortType(sortType));
    dispatch(changePage(1));
    dispatch(fetchQuestions());
  };

  const onSortOrderChange = (sortOrder: SortOrder) => {
    dispatch(changeSortOrder(sortOrder));
    dispatch(changePage(1));
    dispatch(fetchQuestions());
  };

  return (
    <div
      className={`flex gap-6 ${
        status === "loading" && "pointer-events-none opacity-50"
      }`}
    >
      <label className={labelClassName}>
        <span>Количество вопросов за запрос</span>
        <Select
          value={pageSize}
          placeholder="Выберите количество"
          options={pageSizeOptions}
          onChange={onPageSizeChange}
        />
      </label>
      <label className={labelClassName}>
        <span>Сортировать по</span>
        <Select
          style={{ width: 250 }}
          value={sortType}
          placeholder="Выберите способ сортировки"
          options={sortTypeOptions}
          onChange={onSortTypeChange}
        />
      </label>
      <label className={labelClassName}>
        <span>Порядок сортировки</span>
        <Select
          value={sortOrder}
          placeholder="Выберите порядок сортировки"
          options={sortOrderOptions}
          onChange={onSortOrderChange}
        />
      </label>
    </div>
  );
};

export default SearchSettings;
