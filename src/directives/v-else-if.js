export default {
    bind(el, binding) {
      const parentEl = el.parentNode;
      const value = binding.value;
      const elseIfBlocks = parentEl.children.filter((child) => child.hasAttribute("v-else-if"));
      const elseBlock = parentEl.children.find((child) => child.hasAttribute("v-else"));
  
      if (!value) {
        parentEl.removeChild(el);
      } else {
        parentEl.removeChild(elseBlock);
        elseIfBlocks.forEach(n => n !== el && parentEl.removeChild(n));
      }
    },
  };
  