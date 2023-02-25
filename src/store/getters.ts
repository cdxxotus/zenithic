import { StoreConfig } from "../types/store";

export const createGetters = (config?: StoreConfig) => {
  const getters = config?.getters || {};
  const modules = config?.modules || {};
  const allGetters = {};

  Object.keys(modules).forEach((moduleName) => {
    const module = modules[moduleName];
    const { getters = {} } = module;

    Object.keys(getters).forEach((getterName) => {
      const getterFullName = `${moduleName}/${getterName}`;
      allGetters[getterFullName] = getters[getterName];
    });
  });

  Object.keys(getters).forEach((getterName) => {
    allGetters[getterName] = getters[getterName];
  });

  return allGetters;
}
