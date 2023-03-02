import { Directive, OnDirective } from "../types/directives/types";

/**
 * A directive for adding events listeners to an Element
 * @type {OnDirective}
 */
const on: OnDirective = {
  /**
   * Parse the value of the directive to get the event listener function.
   * @param {string} str - The value of the directive.
   * @returns {Function} - The event listener function.
   */
  parseValue(str: string) {
    return this[str];
  },
  /**
   * Add the event listener to the element when the directive is mounted.
   * @param {HTMLElement} el - The element the directive is mounted on.
   * @param {Object} binding - The binding object for the directive.
   */
  mounted(el, binding) {
    // Get the event name
    const eventName = binding.arg;

    // Get the event handler
    const eventHandler = binding.value;

    // Listen for the event on the element
    el.addEventListener(eventName, eventHandler);
  },
};

export default on satisfies Directive;
