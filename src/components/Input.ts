import { Component, InputComponent } from "../types/components";

export const Input: InputComponent = {
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
      this.onInput((e.target as HTMLInputElement).value);
    },
  },
} satisfies Component;