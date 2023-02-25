import { StoreConfig } from "../types/store";

export const createState = (config?: StoreConfig) => {
  const initialState = config?.initialState || {};
  const modules = config?.modules || {};
  const allState = {};

  Object.keys(modules).forEach((moduleName) => {
    const module = modules[moduleName];
    const { initialState = {} } = module;
    allState[moduleName] = initialState;
  });

  Object.keys(initialState).forEach((stateName) => {
    allState[stateName] = initialState[stateName];
  });

  return allState;
}
