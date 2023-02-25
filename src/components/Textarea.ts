import { Component, TextareaComponent } from "../types/components";

const Textarea: TextareaComponent = {
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
};

export default Textarea satisfies Component;