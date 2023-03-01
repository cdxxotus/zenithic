import { Directive, ElseIfDirective } from "../types/directives/types";

/**
 * A directive that adds or removes an element from the DOM based on the
 * provided value.
 * The element will be hidden if the previous `v-if` Directive is true or if this directive is false
 * @type {Directive}
 */
const elseIf: ElseIfDirective = {
  parseValue(str: string) {
    return Boolean(this[str]) || false;
  },
  beforeMount(el, binding) {
    const parentEl = el.parentNode;
    if (!parentEl) return;

    const value = binding.value;
    const elseIfBlocks = Array.from(parentEl.children).filter((child) =>
      child.hasAttribute("v-else-if")
    );
    const elseBlock = Array.from(parentEl.children).find((child) =>
      child.hasAttribute("v-else")
    );

    if (!value) {
      parentEl.removeChild(el);
    } else {
      if (elseBlock) parentEl.removeChild(elseBlock);
      elseIfBlocks.forEach((n) => n !== el && parentEl.removeChild(n));
    }
  },
};

export default elseIf satisfies Directive;
