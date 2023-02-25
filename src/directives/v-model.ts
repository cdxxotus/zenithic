import domUtils from "../utils/dom";

import { Directive, ModelDirective } from "../types/directives/types";

const modelDirective: ModelDirective = {
  beforeMount(el, binding) {
    domUtils.set(el, binding.value);

    el.addEventListener("change", () => {
      if (domUtils.isInput(el) || domUtils.isSelect(el)) {
        binding.value = (el as HTMLInputElement).value;
      } else {
        binding.value = el.textContent;
      }
    });
  },
  update(el, binding) {
    domUtils.set(el, binding.value);
  },
};

export default modelDirective satisfies Directive;
