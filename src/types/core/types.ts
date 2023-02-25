import { ComponentsConfig } from "../components";
import { DirectivesConfig } from "../directives/types";
import { FiltersConfig } from "../filters/types";
import { MixinsConfig } from "../mixins";
import { RouterConfig } from "../router";
import { StoreConfig } from "../store";
import { UtilsConfig } from "../utils";

export type ZenithicApp = any;

export type ComponentLifecycle = "beforeMount" | "mounted" | "updated" | "beforeDestroy" | "destroyed";

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
}