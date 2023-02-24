import { RouterConfig, History } from "../types/router";

export const prepareRouter = (config?: RouterConfig) => {
  let history: History;
  const routes = config?.routes || [];

  const registerHistory = (h: History) => {
    history = h;
  };

  const registerRoutes = (r) => {
    routes.push(...r);
  };

  const navigateTo = (pathname) => {
    if (history) history.push(pathname);
  };

  const match = (pathname) => {
    return routes.find((route) => route.path === pathname);
  };

  const listen = (callback) => {
    history.listen((pathname) => {
      callback(match(pathname));
    });
  };

  return {
    registerHistory,
    registerRoutes,
    navigateTo,
    listen,
  };
};
