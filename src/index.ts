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

/**
 * An array to hold all created Zenithic apps.
 */
const apps: ZenithicApp[] = [];

/**
 * Merges the given config object with the default config object,
 * overriding the default values with the values from the given object.
 * @param {Config} defaultConfig The default config object.
 * @param {Config} config The config object to merge with the default config object.
 * @returns The merged config object.
 */
const mergeConfigs = (defaultConfig: Config, config?: Config): Config => {
  const keys = Object.keys(config || {});
  return {
    router: keys.includes('router') ? config?.router : defaultConfig.router,
    store: keys.includes('store') ? config?.store : defaultConfig.store,
    mixins: keys.includes('mixins') ? config?.mixins : defaultConfig.mixins,
    directives: keys.includes('directives') ? config?.directives : defaultConfig.directives,
    filters: keys.includes('filters') ? config?.filters : defaultConfig.filters,
    components: keys.includes('components') ? config?.components : defaultConfig.components,
    utils: keys.includes('utils') ? config?.utils : defaultConfig.utils,
  }
}

/**
 * Creates a new Zenithic app with the given configuration object.
 * @param {Config} conf The configuration object for the new app.
 * @returns {ZenithicApp} The newly created Zenithic app.
 */
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

/**
 * Gets the first Zenithic app that was created.
 *
 * @returns {ZenithicApp} The first Zenithic app.
 */
export const getApp = () => apps[0];

/**
 * Gets all created Zenithic apps.
 *
 * @returns {ZenithicApp[]} An array of all created Zenithic apps.
 */
export const getApps = () => apps;

/**
 * Gets the utils object of the first Zenithic app that was created.
 *
 * @returns The utils object of the first Zenithic app.
 */
export const getUtils = () => getApp()?.utils;

/**
 * Gets the components object of the first Zenithic app that was created.
 *
 * @returns The components object of the first Zenithic app.
 */
export const getComponents = () => getApp()?.components;

/**
 * Gets the router object of the first Zenithic app that was created.
 *
 * @returns The router object of the first Zenithic app.
 */
export const getRouter = () => getApp()?.router;

/**
 * Gets the store object of the first Zenithic app that was created.
 *
 * @returns The store object of the first Zenithic app.
 */
export const getStore = () => getApp()?.store;

/**
 * Gets the directives object of the first Zenithic app that was created.
 *
 * @returns The directives object of the first Zenithic app.
 */
export const getDirectives = () => getApp()?.directives;

/**
 * Gets the filters object of the first Zenithic app that was created.
 *
 * @returns The filters object of the first Zenithic app.
 */
export const getFilters = () => getApp()?.filters;

/**
 * Gets the mixins object of the first Zenithic app that was created.
 *
 * @returns The mixins object of the first Zenithic app.
 */
export const getMixins = () => getApp()?.mixins;