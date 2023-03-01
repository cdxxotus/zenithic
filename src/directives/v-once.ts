import { Directive, OnceDirective } from "../types/directives/types";

/**
 * A directive for evaluating the content of an element only once.
 * If the component is updated, this value won't be reevaluated.
 * @type {OnceDirective}
 */
const once: OnceDirective = {
  parseValue(str: string) {
    return String(this[str]);
  },
  beforeMount(el, binding) {
    // Set the element's content to be evaluated once
    el.textContent = binding.value;
  },
};

export default once satisfies Directive;
