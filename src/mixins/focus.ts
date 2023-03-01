import { Mixin } from "../types/mixins";

/**
 * Mixin for focusing an element when mounted.
 * @type {Mixin}
 */
const focus: Mixin = {
  mounted() {
    this.$el.focus();
  },
};

export default focus;