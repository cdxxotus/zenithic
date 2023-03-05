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
    const matched = str.match(/(.*) in (.*)/);

    // TODO: index
    return this[matched[2]] ?? [];
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

    const str = el.getAttribute('v-for');
    const matched = str.match(/(.*) in (.*)/);
    const itemPropertyName = matched[1]

    const copyEl = el.cloneNode(true) as HTMLElement;
    copyEl.removeAttribute("v-for");

    parentEl.removeChild(el);

    // Get the array of items to iterate over
    const items = binding.value;

    // TODO: support more iterables

    // Loop over the array and create a new element for each item
    items.forEach((item) => {
      const itemEl = copyEl.cloneNode(true) as HTMLElement;
      itemEl.textContent = itemEl.textContent.replace(
        /\(\(--@@(.+?)@@--\)\)/gms,
        (_string, match) => {
          // TODO: support filters
          const splittedMatch: string[] = match.trim().split('.');
          const propertyName = splittedMatch.splice(0, 1);
          if (propertyName[0] === itemPropertyName) {
            return splittedMatch.reduce((acc, v) => acc?.[v], item);
          } else {
            return match;
          }
        }
      );
      parentEl.appendChild(itemEl);
    });
  },
};

export default forDirective satisfies Directive;
