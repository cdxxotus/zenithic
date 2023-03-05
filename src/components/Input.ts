import { Component, InputComponent } from "../types/components";

// TODO: fixme
// v-model should handle parent state

/**
 * An Input component that can be used in Components, Layouts and Pages.
 * @type {InputComponent}
 */
export default {
  template: `<input
    type="text"
    v-model="value"
    @input="handleInput"
    :placeholder="placeholder"
  />`,
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    onInput: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleInput(e) {
      this.onInput?.((e.target as HTMLInputElement).value);
    },
  },
} as InputComponent satisfies Component;