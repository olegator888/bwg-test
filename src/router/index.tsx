import { Route, RouteProps, Routes } from "react-router-dom";
import { RouterConfig } from "router/config";

const AppRouter = () => {
  const renderRoute = (route: RouteProps) => (
    <Route key={route.path} path={route.path} element={route.element} />
  );

  return <Routes>{Object.values(RouterConfig).map(renderRoute)}</Routes>;
};

export default AppRouter;
