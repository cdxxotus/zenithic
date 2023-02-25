import bind from "./v-bind";
import cloak from "./v-cloak";
import elseIf from "./v-else-if";
import elseDirective from "./v-else";
import forLoop from "./v-for";
import ifCondition from "./v-if";
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
    install: (app) =>
      (app["directives"] = {
        bind,
        cloak,
        elseIf,
        else: elseDirective,
        for: forLoop,
        if: ifCondition,
        model,
        on,
        once,
        pre,
        show,
        tooltip,
      }),
  };
}
