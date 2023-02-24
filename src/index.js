import { createApp } from "./core";
import { createRouter } from "./router";
import { createStore } from "./store";
import { createMixins } from "./mixins";
import { createDirectives } from "./directives";
import { createFilters } from "./filters";
import { createComponents } from "./components";
import { createUtils } from "./utils";
import defaultConfig from "./config";

export default createZenithic = (config = defaultConfig) => {
  const app = createApp();
  const router = createRouter(config.router);
  const store = createStore(config.store);
  const mixins = createMixins(config.mixins);
  const directives = createDirectives(config.directives);
  const filters = createFilters(config.filters);
  const components = createComponents(config.components);
  const utils = createUtils(config.utils);

  app.use(router);
  app.use(store);
  app.use(mixins);
  app.use(directives);
  app.use(filters);
  app.use(components);
  app.use(utils);

  return app;
};
