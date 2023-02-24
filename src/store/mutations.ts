import { StoreConfig } from "../types/store";

export const createMutations = (config: StoreConfig) => {
  const { mutations = {}, modules = {} } = config;
  const allMutations = {};

  Object.keys(modules).forEach((moduleName) => {
    const module = modules[moduleName];
    const { mutations = {} } = module;

    Object.keys(mutations).forEach((mutationName) => {
      const mutationFullName = `${moduleName}/${mutationName}`;
      allMutations[mutationFullName] = mutations[mutationName];
    });
  });

  Object.keys(mutations).forEach((mutationName) => {
    allMutations[mutationName] = mutations[mutationName];
  });

  return allMutations;
}
