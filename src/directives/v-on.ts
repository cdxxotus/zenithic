import { Directive, OnDirective } from "../types/directives/types";

/**
 * A directive for adding events listeners to an Element
 * @type {OnDirective}
 */
const on: OnDirective = {
  parseValue(str: string) {
    return this[str];
  },
  mounted(el, binding) {
    // Get the event name
    const eventName = binding.arg;
    // Get the event handler
    const eventHandler = binding.value;
    // Listen for the event on the element

    // TODO: fixme
    // el is not the mounted el
    // el.addEventListener(eventName, eventHandler);
  },
};

export default on satisfies Directive;
