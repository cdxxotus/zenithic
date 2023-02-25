import { Component, ButtonComponent } from "../types/components";

const template = `
  <button>{{ text }}</button>
`;

const Button: ButtonComponent = {
  template,
  props: {
    text: {
      type: String,
      required: true,
    },
  }
};

export default Button satisfies Component;
