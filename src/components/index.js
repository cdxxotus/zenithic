import Button from "./Button.js";
import DatePicker from "./DatePicker.js";
import Input from "./Input.js";
import Item from "./Item.js";
import List from "./List.js";
import Select from "./Select.js";
import TextArea from "./TextArea.js";

export function createComponents(config) {
  return {
    install: (app) =>
      (app["components"] = {
        Button,
        DatePicker,
        Input,
        Item,
        List,
        Select,
        TextArea,
      }),
  };
}
