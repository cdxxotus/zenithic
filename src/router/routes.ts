import { RouterConfig, Route } from "../types/router";

export const createRoutes = (config?: RouterConfig) => {
  const routes: Route[] = [];

  routes.concat(config?.routes || []);

  return routes;
};
