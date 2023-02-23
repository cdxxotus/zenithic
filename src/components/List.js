export default {
  template: `<ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item"/>
    </li>
  </ul>`,
  props: ['items']
}