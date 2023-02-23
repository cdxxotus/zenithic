export default {
  bind(el, binding) {
    // Get the event name
    const eventName = binding.arg;
    // Get the event handler
    const eventHandler = binding.value;
    // Listen for the event on the element
    el.addEventListener(eventName, eventHandler);
  },
};
