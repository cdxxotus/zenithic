import { Directive, BindDirective } from "../types/directives/types";

const bind: BindDirective = {
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
