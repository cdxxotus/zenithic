export default {
  bind(el, binding) {
    // Set the element's content to be evaluated once
    el.textContent = binding.value;
  },
};
