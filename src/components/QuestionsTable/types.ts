import { AppStateStatus } from "types/appSlice";
import { Question } from "types/question";

export interface QuestionsTableProps {
  data: Question[];
  status: AppStateStatus;
  page: number;
  pageSize: number;
  total?: number;
}
