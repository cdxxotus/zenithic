export const createRoutes = (config) => {
  const routes = [];

  routes.concat(config.router.routes);

  return routes;
};

export const createRoute = (config) => {
  const { path, component, options = {} } = config;

  return {
    path,
    component,
    options,
  };
};
