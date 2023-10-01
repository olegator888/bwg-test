import { DefaultOptionType } from "antd/es/select";

export const pageSizeOptions: DefaultOptionType[] = [
  {
    label: 5,
    value: 5,
  },
  {
    label: 10,
    value: 10,
  },
  {
    label: 15,
    value: 15,
  },
  {
    label: 20,
    value: 20,
  },
];

export const sortTypeOptions: DefaultOptionType[] = [
  {
    label: "Релевантность",
    value: "relevance",
  },
  {
    label: "Дата последней активности",
    value: "activity",
  },
  {
    label: "Дата создания",
    value: "creation",
  },
  {
    label: "Количество голосов",
    value: "votes",
  },
];

export const sortOrderOptions: DefaultOptionType[] = [
  {
    label: "По возрастанию",
    value: "asc",
  },
  {
    label: "По убыванию",
    value: "desc",
  },
];
