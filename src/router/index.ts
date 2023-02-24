import { createHistory } from "./history";
import { createRoutes } from "./routes";
import { prepareRouter } from "./router";

import { RouterConfig } from "../types/router";

export const createRouter = (config?: RouterConfig) => {
  const router = prepareRouter(config);
  const history = createHistory();
  const routes = createRoutes(config);

  router.registerHistory(history);
  router.registerRoutes(routes);

  return {
    install: (app) => (app["router"] = router),
  };
};
