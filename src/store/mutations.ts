import { Modules, Mutations, StoreConfig } from "../types/store";

/**
 * Creates a `Mutations` object, that includes all modules mutations.
 *
 * @param {StoreConfig} [config={}] Store configuration.
 * @returns {Mutations} All store mutations.
 */
export const createMutations = (config?: StoreConfig) => {
  const mutations = config.mutations || {};
  const modules = config.modules || {};
  const mutationsNames = Object.keys(mutations) as Array<keyof Mutations>;
  const modulesNames = Object.keys(modules) as Array<keyof Modules>;
  const allMutations = {};

  modulesNames.forEach((moduleName) => {
    const module = modules[moduleName];
    const { mutations: moduleMutations = {} } = module;
    const moduleMutationsNames = Object.keys(moduleMutations) as Array<keyof Mutations>;

    moduleMutationsNames.forEach((mutationName) => {
      const mutationFullName = `${moduleName}/${mutationName}`;
      allMutations[mutationFullName] = mutations[mutationName];
    });
  });

  mutationsNames.forEach((mutationName) => {
    allMutations[mutationName] = mutations[mutationName];
  });

  return allMutations;
}
