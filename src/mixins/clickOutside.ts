import { Mixin } from '../types/mixins';

const clickOutside: Mixin = {
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
      const element = this.$el;
      if (!element.contains(event.target)) {
        this.onClickOutside(event);
      }
    },
  },
};

export default clickOutside;
