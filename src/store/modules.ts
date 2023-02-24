import { prepareStore } from "./store";

import { StoreConfig } from "../types/store";

export const createModules = (config: StoreConfig) => {
  const { modules = {} } = config;
  const allModules = {};

  Object.keys(modules).forEach((moduleName) => {
    const module = modules[moduleName];
    const moduleStore = prepareStore(module);

    allModules[moduleName] = moduleStore;
  });

  return allModules;
}
