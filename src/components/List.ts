import { Component, ListComponent } from "../types/components";

/**
 * A List component that can be used in Components, Layouts and Pages.
 * @type {ListComponent}
 */
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
