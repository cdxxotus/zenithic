import { Component, TextareaComponent } from "../types/components";

/**
 * A Textarea component that can be used in Components, Layouts and Pages.
 * @type {TextareaComponent}
 */
export default {
  template: `<textarea
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
      this.onInput((e.target as HTMLTextAreaElement).textContent);
    },
  },
} as TextareaComponent satisfies Component;