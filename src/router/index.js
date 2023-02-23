import { createHistory } from "./history";
import { createRoutes } from "./routes";
import { createRouter } from "./router";

export const createRouter = (config) => {
  const router = createRouter(config);
  const history = createHistory(config);
  const routes = createRoutes(config);

  router.registerHistory(history);
  router.registerRoutes(routes);

  return {
    install: (app) => (app["router"] = router),
  };
};
