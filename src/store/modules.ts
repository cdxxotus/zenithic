import { prepareStore } from "./store";

import { StoreConfig, Modules } from "../types/store";

/**
 * Creates all store modules.
 *
 * @param {StoreConfig} [config={}] Store configuration.
 * @returns {Modules} All store modules.
 */
export const createModules = (config?: StoreConfig): Modules => {
  const modules = config.modules || {};
  const modulesNames = Object.keys(modules) as Array<keyof Modules>;
  const allModules = {};

  modulesNames.forEach((moduleName) => {
    const module = modules[moduleName];
    const moduleStore = prepareStore(module);

    allModules[moduleName] = moduleStore;
  });

  return allModules;
}
