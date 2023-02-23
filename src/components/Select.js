export default {
  template: `<select v-model="value" @change="handleChange">
    <option v-for="option in options" :value="option.value" :key="option.value">
      {{ option.label }}
    </option>
  </select>`,
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  methods: {
    handleChange(e) {
      this.onChange(e.target.value)
    }
  }
}