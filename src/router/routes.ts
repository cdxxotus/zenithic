import { RouterConfig, Route } from "../types/router";

/**
 * @param config Router configuration
 * @returns {Route[]}
 */
export const createRoutes = (config?: RouterConfig) => {
  const routes: Route[] = [].concat(...config?.routes ?? []);

  return routes;
};
