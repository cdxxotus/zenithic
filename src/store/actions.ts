import { StoreConfig, Modules, Actions } from "../types/store";

/**
 * Merges all actions from the store configuration into one object.
 * 
 * @param {StoreConfig} [config={}] Store configuration.
 * @returns {Actions} All store actions.
 */
export const createActions = (config?: StoreConfig): Actions => {
  const actions = config?.actions ?? {};
  const modules = config?.modules ?? {};
  const modulesNames = Object.keys(modules) as Array<keyof Modules>;
  const actionsNames = Object.keys(actions) as Array<keyof Actions>;
  const allActions: Actions = {};

  modulesNames.forEach((moduleName) => {
    const { actions: moduleActions = {} } = modules[moduleName];
    const moduleActionsNames = Object.keys(moduleActions) as Array<keyof Actions>;

    moduleActionsNames.forEach((actionName) => {
      allActions[`${moduleName}/${actionName}`] = actions[actionName];
    });
  });

  actionsNames.forEach((actionName) => {
    allActions[actionName] = actions[actionName];
  });

  return allActions;
}
