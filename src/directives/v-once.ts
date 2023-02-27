import { Directive, OnceDirective } from "../types/directives/types";

const once: OnceDirective = {
  parseValue(str: string) {
    return this[str].toString();
  },
  beforeMount(el, binding) {
    // Set the element's content to be evaluated once
    el.textContent = binding.value;
  },
};

export default once satisfies Directive;