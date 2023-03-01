import { Directive, IfDirective } from "../types/directives/types";

/**
 * A directive that adds or removes an element from the DOM based on the provided value.
 *
 * If the value is falsy, the element will be removed from the DOM. If the value is truthy,
 * the element will be displayed. If the value is falsy and there is a sibling `v-else-if` element, it will be
 * checked for display. If there is a sibling `v-else` element, it will be displayed if all previous conditions fail.
 *
 * @type {IfDirective}
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
      // If the value is falsy, remove the element from the DOM.
      parentEl.removeChild(el);
    } else {
      // If the value is truthy and there is an `v-else` block, remove all of them from the DOM.
      if (elseBlock) parentEl.removeChild(elseBlock);
      
      // If the value is truthy and there is an `v-else-if` block, remove all of them from the DOM.
      if (elseIfBlocks) elseIfBlocks.forEach((n) => parentEl.removeChild(n));
    }
  },
};

export default ifDirective satisfies Directive;
