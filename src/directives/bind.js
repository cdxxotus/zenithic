export default {
  bind(el, binding) {
    // Get the attribute name
    const attributeName = binding.arg;
    // Get the attribute value
    const attributeValue = binding.value;
    // Set the attribute on the element
    el.setAttribute(attributeName, attributeValue);
  },
};
