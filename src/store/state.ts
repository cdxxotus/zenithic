import { Modules, State, StoreConfig } from "../types/store";

/**
 * Creates a new store state object by combining the initial state and the modules' initial states.
 * @param {StoreConfig} config - The store configuration object.
 * @returns {State} The new store state object.
 */
export const createState = (config?: StoreConfig) => {
  const initialState = config?.initialState ?? {};
  const modules = config?.modules ?? {};
  const modulesNames = Object.keys(modules) as Array<keyof Modules>;
  const allState: State = {};

  modulesNames.forEach((moduleName) => {
    const { initialState: moduleInitialState = {} } = modules[moduleName];
    Object.assign(allState, { [moduleName]: moduleInitialState })
  });

  Object.assign(allState, initialState);

  return allState;
}
