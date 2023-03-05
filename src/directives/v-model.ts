import { set, isInput, isSelect } from "../utils/dom";

import { Directive, ModelDirective } from "../types/directives/types";

/**
 * A directive for binding an Input or Select value, or a TextArea textContent, to a state property.
 * A change in the Store updates the Element value, and a change of the Element value updates the store.
 * @type {ModelDirective}
 */
const modelDirective: ModelDirective = {
  /**
   * Returns an object with `get` and `set` functions that retrieve and update the state property.
   * @param {string} str - The name of the state property to bind to.
   * @returns {object} An object with `get` and `set` functions.
   */
  parseValue(str: string) {
    return { get: () => String(this[str]), set: (v: string) => this[str] = v };
  },
  /**
   * Sets the initial value of the element to the current value of the state property,
   * and adds an event listener to update the state property when the element value changes.
   * @param {HTMLElement} el - The element to bind to.
   * @param {object} binding - The binding object.
   */
  beforeMount(el, binding) {
    set(el, binding.value.get());

    el.addEventListener("change", () => {
      // TODO: fixme bidirectional update
      if (isInput(el) || isSelect(el)) {
        binding.value.set((el as HTMLInputElement).value);
      } else {
        binding.value.set(el.textContent);
      }
    });
  },
  /**
   * Sets the element value to the current value of the state property when the state changes,
   * @param {HTMLElement} el - The element to bind to.
   * @param {object} binding - The binding object.
   */
  update(el, binding) {
    set(el, binding.value.get());
  },
};

export default modelDirective satisfies Directive;
