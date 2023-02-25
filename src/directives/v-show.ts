import { Directive, ShowDirective } from "../types/directives/types";

const show: ShowDirective = {
  bind(el, binding) {
    // Get the element's computed style
    const style = window.getComputedStyle(el);
    // Set the element's display property based on the binding's value
    el.style.display = binding.value ? style.display : "none";
  },
};

export default show satisfies Directive;
