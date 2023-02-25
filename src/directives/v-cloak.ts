import { Directive, CloakDirective } from "../types/directives/types";

const cloak: CloakDirective = {
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
