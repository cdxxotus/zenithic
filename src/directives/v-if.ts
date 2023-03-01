import { Directive, IfDirective } from "../types/directives/types";

/**
 * A directive that adds or removes an element from the DOM based on the
 * provided value.
 * @type {Directive}
 */
const ifDirective: IfDirective = {
  parseValue(str: string) {
    return Boolean(this[str]);
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
      parentEl?.removeChild(el);
    } else {
      if (elseBlock) {
        parentEl?.removeChild(elseBlock);
        elseIfBlocks.forEach((n) => parentEl?.removeChild(n));
      }
    }
  },
};

export default ifDirective satisfies Directive;
