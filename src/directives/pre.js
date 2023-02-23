export default {
  bind(el, binding) {
    // Set the element's content to be evaluated later
    el.textContent = "{{ " + binding.value + " }}";
  },
};
