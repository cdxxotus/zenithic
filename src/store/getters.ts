import { Getters, StoreConfig, Modules } from "../types/store";

/**
 * Creates an object containing all the getters of the store,
 * including the ones in modules.
 * 
 * @param {StoreConfig} [config={}] Store configuration.
 * @returns {Getters} All store getters.
 */
export const createGetters = (config?: StoreConfig): Getters => {
  const getters = config?.getters ?? {};
  const modules = config?.modules ?? {};
  const gettersNames = Object.keys(getters) as Array<keyof Getters>;
  const modulesNames = Object.keys(modules) as Array<keyof Modules>;
  const allGetters: Getters = {};

  modulesNames.forEach((moduleName) => {
    const { getters: moduleGetters = {} } = modules[moduleName];
    const moduleGettersNames = Object.keys(moduleGetters) as Array<keyof Getters>;

    moduleGettersNames.forEach((getterName) => {
      allGetters[`${moduleName}/${getterName}`] = moduleGetters[getterName];
    });
  });

  gettersNames.forEach((getterName) => {
    allGetters[getterName] = getters[getterName];
  });

  return allGetters;
}
