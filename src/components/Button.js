const template = `
  <button>{{ text }}</button>
`;

const Button = {
  template,
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // ...
    };
  },
  computed: {
    // ...
  },
  methods: {
    // ...
  },
  watch: {
    // ...
  },
  mounted() {
    // ...
  },
  updated() {
    // ...
  },
  beforeDestroy() {
    // ...
  },
  destroyed() {
    // ...
  },
  mixins: [
    // ...
  ],
};

export default Button;
