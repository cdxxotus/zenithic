export default {
  bind(el, binding) {
    // Get the parent element
    const parentEl = el.parentNode;
    // If the binding's value is false, remove the element from the DOM
    if (!binding.value) {
      parentEl.removeChild(el);
    }
  },
};
