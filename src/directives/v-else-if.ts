import { Directive, ElseIfDirective } from "../types/directives/types";

/**
 * A directive that conditionally adds or removes an element from the DOM based on a boolean value.
 * If the previous `v-if` directive is true or if this directive is false, the element will be hidden.
 * @type {ElseIfDirective}
 */
const elseIf: ElseIfDirective = {
  /**
   * Parses the directive's value as a boolean, defaulting to `false` if the value is undefined or falsy.
   * @param {string} str - The directive's value as a string.
   * @returns {boolean} The boolean representation of the directive's value.
   */
  parseValue(str: string) {
    return Boolean(this[str]) || false;
  },
  /**
   * Called before the directive's host element is mounted to the DOM.
   * Removes the host element if the directive's value is falsy, or removes other "v-else-if" blocks and "v-else" blocks
   * if the directive's value is truthy.
   * @param {HTMLElement} el - The directive's host element.
   * @param {Binding} binding - The directive binding object.
   */
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
