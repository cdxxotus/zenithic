import { Directive, BindDirective } from "../types/directives/types";

/**
 * This directive allows setting a value to an attribute of the element.
 * @type {BindDirective}
 */
const bind: BindDirective = {
  parseValue(str: string) {
    return String(this[str] || str);
  },
  beforeMount(el, binding) {
    const attributeName = binding.arg;
    const attributeValue = binding.value;
    el.setAttribute(attributeName, attributeValue);
  },
};

export default bind satisfies Directive;
