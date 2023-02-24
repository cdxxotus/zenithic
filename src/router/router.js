import { createLocation } from "./location";

export const createRouter = () => {
  const history = null;
  const routes = [];

  const registerHistory = (h) => {
    history = h;
  };

  const registerRoutes = (r) => {
    routes.push(...r);
  };

  const navigateTo = (location) => {
    const loc = createLocation(location);
    history.push(loc);
  };

  const match = (currentPath) => {
    return routes.find(route => route.path === currentPath);
  }

  const listen = (currentPath) => {
    return match(currentPath);
  }

  return {
    registerHistory,
    registerRoutes,
    navigateTo,
    listen,
  };
};
