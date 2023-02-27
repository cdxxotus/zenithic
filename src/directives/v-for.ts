import { Directive, ForDirective } from "../types/directives/types";

const forDirective: ForDirective = {
  parseValue(str: string) {
    const matched = str.match(/(.*) in (.*)/gm);

    // TODO: index
    return this[matched[1]];
  },
  beforeMount(el, binding) {
    // Get the parent element
    const parentEl = el.parentNode;
    if (!parentEl) return;

    // Get the array of items to iterate over
    const items = binding.value;
    // Loop over the array and create a new element for each item
    items.forEach((item) => {
      const newEl = document.createElement("div");
      newEl.innerHTML = item;
      parentEl.appendChild(newEl);
    });
  },
};

export default forDirective satisfies Directive;
