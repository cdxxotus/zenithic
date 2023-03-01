import { createHistory } from "./history";
import { createRoutes } from "./routes";
import { prepareRouter } from "./router";

import { RouterConfig } from "../types/router";
import { Plugin } from "../types/core";

/**
 * Creates a new router plugin based on the given configuration.
 *
 * @param config The configuration to use.
 */
export const createRouter = (config?: RouterConfig): Plugin => {
  const router = prepareRouter(config);
  const history = createHistory();
  const routes = createRoutes(config);

  router.registerHistory(history);
  router.registerRoutes(routes);

  return {
    install: (app) => (app["router"] = router),
  };
};
