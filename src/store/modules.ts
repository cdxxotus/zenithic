import { Module, Store } from "../types/store";

import { buildStore } from "./store";

export const prepareModule = (moduleName: string, module: Module): Partial<Store> => {
  const config = {
    initialState: {},
    actions: {},
    getters: {},
    mutations: {},
    modules: {
      [moduleName]: module
    }
  };

  const store = buildStore(config);

  return {
    state: store.state,
    actions: store.actions,
    getters: store.getters,
    mutations: store.mutations,
  }
}
