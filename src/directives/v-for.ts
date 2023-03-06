import { makeElementFromString } from "../utils/dom";

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
    const str = el.getAttribute("v-for");
    const matched = str.match(/(.*) in (.*)/);
    const itemPropertyName = matched[1];

    const copyEl =
      el.innerHTML === el.firstElementChild?.outerHTML
        ? el.firstElementChild.cloneNode(true)
        : makeElementFromString(`<div>${el.innerHTML}</div>`);

    el.innerHTML = '';
    
    // Get the array of items to iterate over
    const items = Array.from(binding.value);

    // Loop over the array and create a new element for each item
    items.forEach((item) => {
      const itemEl = copyEl.cloneNode(true) as HTMLElement;
      const itemElChildren = Array.from(itemEl.children);
      itemElChildren.push(itemEl);
      itemElChildren.forEach((iec) => {
        iec.textContent = iec.textContent.replace(
          /\(\(--@@(.+?)@@--\)\)/gms,
          (_string, match) => {
            // TODO: support filters
            const splittedMatch: string[] = match.trim().split(".");
            const propertyName = splittedMatch.splice(0, 1);
            if (propertyName[0] === itemPropertyName) {
              return splittedMatch.reduce((acc, v) => acc?.[v], item);
            } else {
              return match;
            }
          }
        );
      });
      el.appendChild(itemEl);
    });
  },
};

export default forDirective satisfies Directive;
