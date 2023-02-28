export default {
  context: {},
  router: {
    routes: [],
  },
  store: {
    initialState: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {},
  },
  mixins: [
    "clickOutside",
    "draggable",
    "focus",
    "form",
  ],
  directives: [
    "bind",
    "cloak",
    "else-if",
    "else",
    "for",
    "if",
    "model",
    "on",
    "once",
    "pre",
    "show",
    "tooltip",
  ],
  filters: [
    "capitalize",
    "currency",
    "date",
    "limitTo",
    "lowercase",
    "orderBy",
    "uppercase"
  ],
  components: [
    "Button",
    "DatePicker",
    "Input",
    "List",
    "Select",
    "Textarea",
  ],
  utils: [
    "ajax",
    "date",
    "dom",
    "log",
    "number",
    "type",
    "url",
  ]
};
