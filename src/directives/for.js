export default {
  bind(el, binding) {
    // Get the parent element
    const parentEl = el.parentNode;
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
