import { set, isInput, isSelect } from "../utils/dom";

import { Directive, ModelDirective } from "../types/directives/types";

const modelDirective: ModelDirective = {
  beforeMount(el, binding) {
    set(el, binding.value);

    el.addEventListener("change", () => {
      if (isInput(el) || isSelect(el)) {
        binding.value = (el as HTMLInputElement).value;
      } else {
        binding.value = el.textContent;
      }
    });
  },
  update(el, binding) {
    set(el, binding.value);
  },
};

export default modelDirective satisfies Directive;
