import { Component, ButtonComponent } from "../types/components";

const template = `
  <button>{{ text }}</button>
`;

export const Button: ButtonComponent = {
  template,
  props: {
    text: {
      type: String,
      required: true,
    },
  }
} satisfies Component;