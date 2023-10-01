import { MainPage, QuestionPage, NotFoundPage } from "pages";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
  MAIN = "main",
  QUESTION = "question",
  NOT_FOUND = "not_found",
}

export const RoutePath = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.QUESTION]: "/questions/:id",
  [AppRoutes.NOT_FOUND]: "*",
};

export const RouterConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.QUESTION]: {
    path: RoutePath.question,
    element: <QuestionPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};

// helpers
export const getQuestionRoute = (id: string) =>
  RoutePath.question.replace(":id", id);
