import { ComponentLifecycle } from "../core/types";

export type Binding = {
  value: any;
  arg: string;
};

export type DirectiveMethod = (el: HTMLElement, binding: Binding) => void;

export type Directive = {
  [key in ComponentLifecycle]?: DirectiveMethod;
};

export type Directives = {
  [directive: string]: Directive;
}

export type DirectivesConfig = string[];

export type TooltipDirective = {
  beforeMount: DirectiveMethod;
  updated: DirectiveMethod;
  beforeDestroy: DirectiveMethod;
};

export type ShowDirective = {
  beforeMount: DirectiveMethod;
};

export type PreDirective = {
  beforeMount: DirectiveMethod;
};

export type OnceDirective = {
  beforeMount: DirectiveMethod;
};

export type OnDirective = {
  beforeMount: DirectiveMethod;
};

export type ModelDirective = {
  beforeMount: DirectiveMethod;
  update: DirectiveMethod;
};

export type IfDirective = {
  beforeMount: DirectiveMethod;
};

export type ForDirective = {
  beforeMount: DirectiveMethod;
};

export type ElseDirective = {};

export type ElseIfDirective = {
  beforeMount: DirectiveMethod;
};

export type CloakDirective = {
  beforeMount: DirectiveMethod;
  mounted: DirectiveMethod;
};

export type BindDirective = {
  beforeMount: DirectiveMethod;
};
