import { Component, ComponentsConfig, Components, Props } from "../components";
import { DirectivesConfig, Directives, Directive } from "../directives/types";
import { FiltersConfig, Filters, Filter } from "../filters/types";
import { MixinsConfig, Mixins } from "../mixins";
import { RouterConfig, Router } from "../router";
import { StoreConfig, Store } from "../store";
import { UtilsConfig, Utils } from "../utils";

export type ZenithicApp = {
  el: Element | null;
  main: Component | null;
  router: Router | null;
  store: Store | null;
  mixins: Mixins | null;
  directives: Directives | null;
  filters: Filters | null;
  components: Components | null;
  utils: Utils | null;
  use: (plugin: Plugin) => void;
  mount: (selector: string, component: Component, props: Props) => void;
  unmount: () => void;
  registerComponent: (name: string, component: Component) => void;
  getComponent: (name: string) => Component;
  registerDirective: (name: string, directive: Directive) => void;
  registerFilter: (name: string, filter: Filter) => void;
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
