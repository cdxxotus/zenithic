import { createApp } from "./core";
import { createRouter } from "./router";
import { createStore } from "./store";
import { createMixins } from "./mixins";
import { createDirectives } from "./directives";
import { createFilters } from "./filters";
import { createComponents } from "./components";
import { createUtils } from "./utils";
import defaultConfig from "./config";

import { Config, ZenithicApp } from "./types/core";

const apps: ZenithicApp[] = [];

const mergeConfigs = (defaultConfig: Config, config?: Config): Config => {
  return {
    router: config?.router || defaultConfig.router,
    store: config?.store || defaultConfig.store,
    mixins: config?.mixins || defaultConfig.mixins,
    directives: config?.directives || defaultConfig.directives,
    filters: config?.filters || defaultConfig.filters,
    components: config?.components || defaultConfig.components,
    utils: config?.utils || defaultConfig.utils,
  }
}

export const createZenithic = (conf?: Config) => {
  const config = mergeConfigs(defaultConfig, conf);

  const app = createApp();

  if (config.router) {
    const router = createRouter(config.router);
    app.use(router);
  }

  if (config.store) {
    const store = createStore(config.store);
    app.use(store);
  }

  const mixins = createMixins(config.mixins);
  app.use(mixins);

  const directives = createDirectives(config.directives);
  app.use(directives);

  const filters = createFilters(config.filters);
  app.use(filters);

  const components = createComponents(config.components);
  app.use(components);

  const utils = createUtils(config.utils);
  app.use(utils);

  apps.push(app);

  return app;
};

export const getApp = () => apps[0];
export const getApps = () => apps;
export const getUtils = () => getApp()?.utils;
export const getComponents = () => getApp()?.components;
export const getRouter = () => getApp()?.router;
export const getStore = () => getApp()?.store;
export const getDirectives = () => getApp()?.directives;
export const getFilters = () => getApp()?.filters;
export const getMixins = () => getApp()?.mixins;