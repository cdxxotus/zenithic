import { ComponentLifecycle } from "../core/types";

export type Binding = {
  value: any;
  arg: string;
};

export type DirectiveMethod = (el: HTMLElement, binding: Binding) => void;

export type DirectiveTemplate = {
  parseValue?: (str: string) => any;
};

export type Directive = DirectiveTemplate & {
  [key in ComponentLifecycle]?: DirectiveMethod;
};

export type Directives = {
  [directive: string]: Directive;
};

export type DirectivesConfig = string[];

export type TooltipDirective = {
  parseValue: (str: string) => string;
  beforeMount: DirectiveMethod;
  updated: DirectiveMethod;
  beforeDestroy: DirectiveMethod;
};

export type ShowDirective = {
  parseValue: (str: string) => boolean;
  beforeMount: DirectiveMethod;
};

export type PreDirective = {
  parseValue: (str: string) => string;
  beforeMount: DirectiveMethod;
};

export type OnceDirective = {
  parseValue: (str: string) => string;
  beforeMount: DirectiveMethod;
};

export type OnDirective = {
  parseValue: (str: string) => string;
  mounted: DirectiveMethod;
};

export type ModelDirective = {
  parseValue: (str: string) => {
    get: () => string;
    set: (str: string) => void;
  };
  beforeMount: DirectiveMethod;
  update: DirectiveMethod;
};

export type IfDirective = {
  parseValue: (str: string) => boolean;
  beforeMount: DirectiveMethod;
};

export type ForDirective = {
  parseValue: (str: string) => {
    itemPropertyName: string;
    itemsPropertyName: string;
    items: any[];
  };
  beforeMount: DirectiveMethod;
};

export type ElseDirective = {};

export type ElseIfDirective = {
  parseValue: (str: string) => boolean;
  beforeMount: DirectiveMethod;
};

export type CloakDirective = {
  parseValue: (str: string) => null;
  beforeMount: DirectiveMethod;
  mounted: DirectiveMethod;
};

export type BindDirective = {
  parseValue: (str: string) => string;
  beforeMount: DirectiveMethod;
};
