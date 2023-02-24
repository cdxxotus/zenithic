import { createStore as createModuleStore } from "./store";

export const createModules = (config) => {
  const { modules = {} } = config;
  const allModules = {};

  Object.keys(modules).forEach((moduleName) => {
    const module = modules[moduleName];
    const moduleStore = createModuleStore(module);

    allModules[moduleName] = moduleStore;
  });

  return allModules;
}
