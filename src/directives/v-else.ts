import { Directive, ElseDirective } from "../types/directives/types";

/**
 * A directive that adds or removes an element from the DOM based 
 * The element will be hidden if the previous `v-if` or `v-if-else` Directive is true
 * @type {ElseDirective}
 */
const elseDirective: ElseDirective = {};

export default elseDirective satisfies Directive;
