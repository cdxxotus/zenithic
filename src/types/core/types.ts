import { Component, ComponentsConfig, Components } from "../components";
import { DirectivesConfig, Directives } from "../directives/types";
import { FiltersConfig, Filters } from "../filters/types";
import { MixinsConfig, Mixins } from "../mixins";
import { RouterConfig, Router } from "../router";
import { StoreConfig, Store } from "../store";
import { UtilsConfig, Utils } from "../utils";

export type ZenithicApp = {
  el: Element;
  main: Component;
  router: Router;
  store: Store;
  mixins: Mixins;
  directives: Directives;
  filters: Filters;
  components: Components;
  utils: Utils;
  use;
  mount;
  unmount;
  registerComponent;
  getComponent;
  registerDirective;
  registerFilter;
};

export type ComponentLifecycle =
  | "beforeMount"
  | "mounted"
  | "updated"
  | "beforeDestroy"
  | "destroyed";

export type Config = {
  router?: RouterConfig;
  store?: StoreConfig;
  mixins?: MixinsConfig;
  directives?: DirectivesConfig;
  filters?: FiltersConfig;
  components?: ComponentsConfig;
  utils?: UtilsConfig;
};

export type Plugin = {
  install: (app: ZenithicApp) => void;
};
