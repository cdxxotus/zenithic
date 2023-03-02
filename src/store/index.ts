import { buildStore } from "./store";

import { StoreConfig, Store } from "../types/store";
import { Plugin } from "../types/core";

/**
 * Creates a new store plugin based on the given configuration.
 *
 * @param config The configuration to use.
 * @returns {Plugin}
 */
export const createStore = (config?: StoreConfig): Plugin => {
  const store = buildStore(config);  

  return {
    install: (app) => (app["store"] = store),
  };
};
