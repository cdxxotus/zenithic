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
      if (config) {
        if (config.includes("bind")) Object.assign(app.directives, { bind });
        if (config.includes("cloak")) Object.assign(app.directives, { cloak });
        if (config.includes("else-if")) Object.assign(app.directives, { "else-if": elseIf });
        if (config.includes("else")) Object.assign(app.directives, { else: elseDirective });
        if (config.includes("for")) Object.assign(app.directives, { for: forDirective });
        if (config.includes("if")) Object.assign(app.directives, { if: ifDirective });
        if (config.includes("model")) Object.assign(app.directives, { model });
        if (config.includes("on")) Object.assign(app.directives, { on });
        if (config.includes("once")) Object.assign(app.directives, { once });
        if (config.includes("pre")) Object.assign(app.directives, { pre });
        if (config.includes("show")) Object.assign(app.directives, { show });
        if (config.includes("tooltip")) Object.assign(app.directives, { tooltip });
      }
    },
  };
};
