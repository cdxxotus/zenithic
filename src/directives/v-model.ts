import { set, isInput, isSelect } from "../utils/dom";

import { Directive, ModelDirective } from "../types/directives/types";

const modelDirective: ModelDirective = {
  parseValue(str: string) {
    return { get: () => this[str].toString(), set: (v: string) => this[str] = v };
  },
  beforeMount(el, binding) {
    set(el, binding.value.get());

    el.addEventListener("change", () => {
      // TODO: fixme bidirectional update
      if (isInput(el) || isSelect(el)) {
        binding.value.set((el as HTMLInputElement).value);
      } else {
        binding.value.set(el.textContent);
      }
    });
  },
  update(el, binding) {
    set(el, binding.value.get());
  },
};

export default modelDirective satisfies Directive;
