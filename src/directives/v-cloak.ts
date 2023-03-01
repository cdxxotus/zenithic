import { Directive, CloakDirective } from "../types/directives/types";

/**
 * This directive hides an element until it has rendered.
 * @type {CloakDirective}
 */
const cloak: CloakDirective = {
  parseValue(_str: string) {
    return null;
  },
  beforeMount(el) {
    // Set the element's content to be hidden until it's rendered
    el.style.display = "none";
  },
  mounted(el) {
    // Show the element once it's been rendered
    el.style.display = "";
  },
};

export default cloak satisfies Directive;
