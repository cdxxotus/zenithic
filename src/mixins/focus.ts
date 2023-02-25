import { Mixin } from "../types/mixins";

const focus: Mixin = {
  mounted() {
    this.$el.focus();
  },
};

export default focus;