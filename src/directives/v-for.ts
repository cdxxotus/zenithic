import { Directive, ForDirective } from "../types/directives/types";

/**
 * Directive for generating Elements while iterating through an array
 * @type {Directive}
 */
const forDirective: ForDirective = {
  parseValue(str: string) {
    const matched = str.match(/(.*) in (.*)/gm);

    // TODO: index
    return {
      itemPropertyName: matched[2],
      itemsPropertyName: matched[2],
      items: this[matched[1]],
    };
  },
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
      const regexp =  new RegExp(`/${binding.value.itemPropertyName}/gm`);
      const newChildString = childString.replace(
        regexp,
        `${binding.value.itemsPropertyName}[${key}]`
      );
      childrenString = childrenString + newChildString;
    });

    el.innerHTML = childrenString;
  },
};

export default forDirective satisfies Directive;
