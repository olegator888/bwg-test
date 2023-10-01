import { Question } from "types/question";

export type AppStateStatus = "idle" | "loading" | "error";
export type SortType = "activity" | "creation" | "votes" | "relevance";
export type SortOrder = "asc" | "desc";

export interface AppData {
  items: Question[];
  has_more?: boolean;
  total?: number;
}

export interface AppState {
  search: string;
  status: AppStateStatus;
  page: number;
  pageSize: number;
  sortType: SortType;
  sortOrder: SortOrder;
  data: AppData;
}

export interface AppInitPayload {
  sortType: SortType | null;
  sortOrder: SortOrder | null;
  pageSize: number | null;
  search: string | null;
}
