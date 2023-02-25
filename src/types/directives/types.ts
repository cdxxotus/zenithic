export type Binding = {
    value: any;
    arg: string;
    modifiers: {
        lazy: boolean;
    }
};

export type DirectiveMethod = (el: HTMLElement, binding: Binding) => void;

export type Directive = Record<string, DirectiveMethod>;

export type DirectivesConfig = string[];

export type TooltipDirective = {
    bind: DirectiveMethod;
    updated: DirectiveMethod;
    beforeDestroy: DirectiveMethod;
}

export type ShowDirective = {
    bind: DirectiveMethod;
}

export type PreDirective = {
    bind: DirectiveMethod;
}

export type OnceDirective = {
    bind: DirectiveMethod;
}

export type OnDirective = {
    bind: DirectiveMethod;
}

export type ModelDirective = {
    bind: DirectiveMethod;
    update: DirectiveMethod;
}