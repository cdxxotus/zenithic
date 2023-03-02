import { isFunction } from "../utils/type";
import { createActions } from "./actions";
import { createGetters } from "./getters";
import { createMutations } from "./mutations";
import { createState } from "./state";
import { prepareModule } from "./modules";

import { Module, StoreConfig, Store } from "../types/store";

/**
 * Creates a new store with the given configuration.
 * 
 * @param {StoreConfig | Module} config 
 * @returns {Store}
 */
export const prepareStore = (config?: StoreConfig | Module): Store => {
  const store: Store = {
    actions: {},
    getters: {},
    mutations: {},
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
    registerModule: (moduleName, module) => {
      const partialStore = prepareModule(moduleName, module);
      Object.assign(store.actions, { ...store.actions, ...partialStore.actions });
      Object.assign(store.getters, { ...store.getters, ...partialStore.getters });
      Object.assign(store.mutations, { ...store.mutations, ...partialStore.mutations });
      Object.assign(store.state, { ...store.state, ...partialStore.state });
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

  if (config) Object.assign(store, config);

  return store;
}

export const buildStore = (config?: StoreConfig): Store => {
  const store = prepareStore();
  const actions = createActions(config);
  const getters = createGetters(config);
  const mutations = createMutations(config);
  const state = createState(config);

  store.registerActions(actions);
  store.registerGetters(getters);
  store.registerMutations(mutations);
  store.registerState(state);
  return store;
}