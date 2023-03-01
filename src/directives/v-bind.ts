import { Directive, BindDirective } from "../types/directives/types";

/**
 * This directive allows to set a value to an attribute of the Element.
 * @type {BindDirective}
 */
const bind: BindDirective = {
  parseValue(str: string) {
    return this[str].toString() || str;
  },
  beforeMount(el, binding) {
    // Get the attribute name
    const attributeName = binding.arg;
    // Get the attribute value
    const attributeValue = binding.value;
    // Set the attribute on the element
    el.setAttribute(attributeName, attributeValue);
  },
};

export default bind satisfies Directive;
