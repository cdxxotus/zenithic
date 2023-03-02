import { Component, ComponentsConfig, Components, Props, CompiledComponent } from "../components";
import { DirectivesConfig, Directives, Directive } from "../directives/types";
import { FiltersConfig, Filters, Filter } from "../filters/types";
import { MixinsConfig, Mixins } from "../mixins";
import { RouterConfig, Router } from "../router";
import { StoreConfig, Store } from "../store";
import { UtilsConfig, Utils } from "../utils";

export type ZenithicApp = {
  $el: Element | null;
  main: Component | null;
  router: Router | null;
  store: Store | null;
  mixins: Mixins | null;
  directives: Directives | null;
  filters: Filters | null;
  components: Components | null;
  utils: Utils | null;
  context: Context | null;
  use: (plugin: Plugin) => void;
  mount: (selectorOrElement: string | Element, component: Component, props: { [key: string]: any }) => void;
  mountComponent: (selectorOrElement: string | Element | DocumentFragment, component: Component, props: { [key: string]: any }) => CompiledComponent;
  unmount: () => void;
  registerComponent: (name: string, component: Component) => void;
  getComponent: (name: string) => Component;
  registerDirective: (name: string, directive: Directive) => void;
  registerFilter: (name: string, filter: Filter) => void;
  setContext: (context: { [key: string]: any }) => void;
};

export type Context = { [key: string]: any };

export type ComponentLifecycle =
  | "beforeMount"
  | "mounted"
  | "updated"
  | "beforeDestroy"
  | "destroyed";

export type Config = {
  router?: RouterConfig | false;
  store?: StoreConfig | false;
  mixins?: MixinsConfig;
  directives?: DirectivesConfig;
  filters?: FiltersConfig;
  components?: ComponentsConfig;
  utils?: UtilsConfig;
};

export type Plugin = {
  install: (app: ZenithicApp) => void;
};
