import bind from "./v-bind";
import cloak from "./v-cloak";
import elseIf from "./v-else-if";
import elseDirective from "./v-else";
import forDirective from "./v-for";
import ifDirective from "./v-if";
import model from "./v-model";
import on from "./v-on";
import once from "./v-once";
import pre from "./v-pre";
import show from "./v-show";
import tooltip from "./v-tooltip";

import { DirectivesConfig } from "../types/directives/types";
import { Plugin } from "../types/core";

export const createDirectives = (config?: DirectivesConfig): Plugin => {
  return {
    install: (app) => {
      Object.assign(
        app.directives,
        config && config.includes("bind") && { bind },
        config && config.includes("cloak") && { cloak },
        config && config.includes("elseIf") && { elseIf },
        config && config.includes("else") && { else: elseDirective },
        config && config.includes("for") && { for: forDirective },
        config && config.includes("if") && { if: ifDirective },
        config && config.includes("model") && { model },
        config && config.includes("on") && { on },
        config && config.includes("once") && { once },
        config && config.includes("pre") && { pre },
        config && config.includes("show") && { show },
        config && config.includes("tooltip") && { tooltip }
      );
    },
  };
};
