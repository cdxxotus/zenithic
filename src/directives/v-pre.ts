import { Directive, PreDirective } from "../types/directives/types";

const pre: PreDirective = {
  bind(el, binding) {
    // Set the element's content to be evaluated later
    el.textContent = "{{ " + binding.value.toString() + " }}";
  },
};

export default pre satisfies Directive;