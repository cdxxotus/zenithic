import { Directive, ForDirective } from "../types/directives/types";

/**
 * A directive that generates elements while iterating through an array
 * @example Usage: v-for="item in items"
 * @type {ForDirective}
 */
const forDirective: ForDirective = {
  /**
   * Parses the directive value and returns an object with the necessary data
   *
   * @param {string} str - The value of the directive
   * @returns {object} An object containing the item and items properties
   */
  parseValue(str: string) {
    const matched = str.match(/(.*) in (.*)/gm);

    // TODO: index
    return {
      itemPropertyName: matched[2],
      itemsPropertyName: matched[2],
      items: this[matched[1]],
    };
  },
  /**
   * Called before the element is mounted to the DOM
   *
   * @param {Element} el - The element the directive is bound to
   * @param {object} binding - The binding object containing the directive's value and arguments
   */
  beforeMount(el, binding) {
    // Get the parent element
    const parentEl = el.parentNode;
    if (!parentEl) return;

    const childString = el.innerHTML;
    let childrenString = "";

    // Get the array of items to iterate over
    const items = binding.value.items;

    // TODO: support more iterables

    // Loop over the array and create a new element for each item
    items.forEach((_item, key) => {
      const regexp = new RegExp(`/${binding.value.itemPropertyName}/gm`);
      const newChildString = childString.replace(
        regexp,
        `${binding.value.itemsPropertyName}[${key}]`
      );
      childrenString = childrenString + newChildString;
    });

    // Replace the original element with the new elements
    parentEl.replaceChild(
      new DOMParser().parseFromString(childrenString, "text/html").body
        .firstChild,
      el
    );
  },
};

export default forDirective satisfies Directive;
