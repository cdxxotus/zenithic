import { Modules, State, StoreConfig } from "../types/store";

export const createState = (config?: StoreConfig) => {
  const initialState = config.initialState || {};
  const modules = config.modules || {};
  const modulesNames = Object.keys(modules) as Array<keyof Modules>;
  const initialStateProps = Object.keys(initialState) as Array<keyof State>;
  const allState = {};

  modulesNames.forEach((moduleName) => {
    const module = modules[moduleName];
    const { initialState = {} } = module;
    allState[moduleName] = initialState;
  });

  initialStateProps.forEach((stateName) => {
    allState[stateName] = initialState[stateName];
  });

  return allState;
}
