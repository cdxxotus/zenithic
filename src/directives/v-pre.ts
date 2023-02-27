import { Directive, PreDirective } from "../types/directives/types";

const pre: PreDirective = {
  parseValue(str: string) {
    return this[str].toString();
  },
  beforeMount(el, binding) {
    // Set the element's content to be evaluated later
    el.textContent = "{{ " + binding.value + " }}";
  },
};

export default pre satisfies Directive;