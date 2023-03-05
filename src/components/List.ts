import { Component, ListComponent } from "../types/components";

/**
 * A List component that can be used in Components, Layouts and Pages.
 * @type {ListComponent}
 */
export default {
  template: `<ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>`,
  props: {
    items: {
      type: Array,
      required: false,
    },
  },
} as ListComponent satisfies Component;
