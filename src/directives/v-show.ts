import { getComputedStyle } from "../utils/dom";

import { Directive, ShowDirective } from "../types/directives/types";

/**
 * A directive for conditionnal displaying of an Element depending on the directive value.
 * @type {ShowDirective}
 */
const show: ShowDirective = {
  parseValue(str: string) {
    return Boolean(this[str]);
  },
  beforeMount(el, binding) {
    // Get the element's computed style
    const style = getComputedStyle(el);
    // Set the element's display property based on the binding's value
    el.style.display = binding.value ? style.display : "none";
  },
};

export default show satisfies Directive;
