import { set } from "../utils/dom";

const modelDirective = {
  bind(elem, binding) {
    set(elem, binding.value);

    binding.modifiers.lazy &&
      elem.addEventListener("change", () => {
        binding.value = elem.value;
      });
  },
  update(elem, binding) {
    set(elem, binding.value);
  },
};

export default modelDirective;
