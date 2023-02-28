import { Component, ListComponent } from "../types/components";

export const List: ListComponent = {
  template: `<ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>`,
  props: {
    items: {
      type: Array,
      required: false,
    },
  },
} satisfies Component;
