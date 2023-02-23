import { set, isInput } from '../utils/dom';
import { isInput } from '../utils/dom';

const modelDirective = {
  beforeMount(elem, binding) {
    if (isInput(elem)) {
      elem.value = binding.value;
    } else {
      set(elem, binding.value);
    }

    binding.modifiers.lazy && elem.addEventListener('change', () => {
      binding.value = elem.value;
    });
  },
  update(elem, binding) {
    if (isInput(elem)) {
      elem.value = binding.value;
    } else {
      set(elem, binding.value);
    }
  },
};

export default modelDirective;