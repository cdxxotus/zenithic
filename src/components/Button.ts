import { Component, ButtonComponent } from "../types/components";

const template = `
  <button>{{ text }}</button>
`;

/**
 * A Button component that can be used in Components, Layouts and Pages.
 * @type {ButtonComponent}
 */
export const Button: ButtonComponent = {
  template,
  props: {
    text: {
      type: String,
      required: true,
    },
  }
} satisfies Component;