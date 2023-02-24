import { isFunction } from "../utils/utils";

import { Module, StoreConfig, Store } from "../types/store";

export const prepareStore = (config: StoreConfig | Module): Store => {
  const store: Store = {
    actions: {},
    getters: {},
    mutations: {},
    modules: {},
    state: {},
    registerActions: (actions) => {
      Object.assign(store.actions, actions);
    },
    registerGetters: (getters) => {
      Object.assign(store.getters, getters);
    },
    registerMutations: (mutations) => {
      Object.assign(store.mutations, mutations);
    },
    registerModules: (modules) => {
      Object.assign(store.modules, modules);
    },
    registerModule: (moduleName, module) => {
      Object.assign(store.modules, { [moduleName]: module });
    },
    registerState: (state) => {
      Object.assign(store.state, state);
    },
    dispatch: async (actionName, ...params) => {
      const action = store.actions[actionName];

      if (!isFunction(action)) {
        throw new Error("Action not found");
      }

      await action(...params);
    },
    commit: function (mutationName, ...params) {
      const mutation = store.mutations[mutationName];

      if (!isFunction(mutation)) {
        throw new Error("Mutation not found");
      }

      mutation(...params);
    },
  };

  Object.assign(store, config);

  return store;
}
