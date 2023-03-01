import { Directive, PreDirective } from "../types/directives/types";

/**
 * A directive for evaluating the property that will be use to evaluate the content.
 * It allows to compute the property name.
 * @type {PreDirective}
 */
const pre: PreDirective = {
  parseValue(str: string) {
    return String(this[str]);
  },
  beforeMount(el, binding) {
    // Set the element's content to be evaluated later
    el.textContent = "{{ " + binding.value + " }}";
  },
};

export default pre satisfies Directive;