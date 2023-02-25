import { Directive, OnceDirective } from "../types/directives/types";

const once: OnceDirective = {
  bind(el, binding) {
    // Set the element's content to be evaluated once
    el.textContent = binding.value.toString();
  },
};

export default once satisfies Directive;