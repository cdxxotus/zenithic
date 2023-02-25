import Button from "./Button.js";
import DatePicker from "./DatePicker.js";
import Input from "./Input.js";
import List from "./List.js";
import Select from "./Select.js";
import TextArea from "./TextArea.js";

import { ComponentsConfig } from "../types/components";
import { Plugin } from "../types/core/types.js";

export const createComponents = (config?: ComponentsConfig): Plugin => {
  return {
    install: (app) =>
      (app["components"] = {
        Button,
        DatePicker,
        Input,
        List,
        Select,
        TextArea,
      }),
  };
}
