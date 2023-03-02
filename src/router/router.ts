import { RouterConfig, History, Route, RouterListenCallback, Router } from "../types/router";

/**
 * `prepareRouter` is a function that returns a `Router` instance with
 * which is used to manage routes in a web application.
 * @param config Router configuration
 * @returns {Router}
 */
export const prepareRouter = (config?: RouterConfig): Router => {
  let history: History;
  const routes = config?.routes || [];

  const registerHistory = (h: History) => {
    history = h;
  };

  const registerRoutes = (r: Route[]) => {
    routes.push(...r);
  };

  const navigateTo = (pathname: string) => {
    if (history) history.push(pathname);
  };

  const match = (pathname: string) => {
    return routes.find((route) => route.path === pathname) || null;
  };

  const listen = (callback: RouterListenCallback) => {
    if (history)
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
