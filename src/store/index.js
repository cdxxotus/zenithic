import { createStore } from "./store";
import { createActions } from "./actions";
import { createGetters } from "./getters";
import { createMutations } from "./mutations";
import { createModules } from "./modules";
import { createState } from "./state";

export const createStore = (config) => {
  const store = createStore();
  const actions = createActions(config.store);
  const getters = createGetters(config.store);
  const mutations = createMutations(config.store);
  const modules = createModules(config.store);
  const state = createState(config.store);

  store.registerActions(actions);
  store.registerGetters(getters);
  store.registerMutations(mutations);
  store.registerModules(modules);
  store.registerState(state);

  return {
    install: (app) => (app["store"] = store),
  };
}
