export default {
  bind(el, binding) {
    const parentEl = el.parentNode;
    const value = binding.value;
    const elseIfBlocks = parentEl.children.filter((child) => child.tag === "else-if");
    const elseBlock = parentEl.children.find((child) => child.tag === "else");

    if (!value) {
      parentEl.removeChild(el);
    } else {
      parentEl.removeChild(elseBlock);
      elseIfBlocks.forEach(n => parentEl.removeChild(n));
    }
  },
};
