import { Component, DatePickerComponent } from "../types/components"

/**
 * A DatePicker component that can be used in Components, Layouts and Pages.
 * @type {DatePickerComponent}
 */
export const DatePicker: DatePickerComponent = {
  template: `<input
    type="date"
    v-model="value"
    @input="handleInput"
    :placeholder="placeholder"
  />`,
  props: {
    value: {
      type: Date,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    },
    onInput: {
      type: Function,
      required: true
    }
  },
  methods: {
    handleInput(e) {
      this.onInput((e.target as HTMLInputElement).value)
    }
  }
} satisfies Component;