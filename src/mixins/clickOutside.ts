import { Mixin } from '../types/mixins';

/**
 * Mixin for detecting clicks outside of an element.
 * @type {Mixin}
 */
const clickOutside: Mixin = {
  /**
   * Add a click event listener to the document.
   */
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  /**
   * Remove the click event listener from the document.
   */
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    /**
     * Check if the click event target is outside of the element.
     * @param {Event} event
     */
    handleClickOutside(event) {
      const element = this.$el;
      if (!element.contains(event.target)) {
        this.onClickOutside(event);
      }
    },
  },
};

export default clickOutside;
