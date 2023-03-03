import { CompiledComponent, Component } from "../../types/components";
import { ZenithicApp } from "../../types/core";
import { error } from "../../utils/log";

const { createZenithic } = require('"../../../src');
const { createComponents } = require("../../components");
const defaultConfig = require("../../config");

let app;
let components;

beforeAll(() => {
  components = createComponents();
});

beforeEach(() => {
  app = null;
});

test("createComponents", () => {
  expect(typeof components).toBe("object");
  expect(Object.keys(components).includes("install")).toBeTruthy();
  expect(Object.keys(components).length).toBe(1);
});

test("app.use(components) with no components in app.config or createComponents.config", () => {
  app = createZenithic({ components: [] });
  expect(app.components).toStrictEqual({});

  app.use(components);
  expect(app.components).toStrictEqual({});
});

test("app.use(components) with no components in app.config but in createComponents.config", () => {
  app = createZenithic({ components: [] });
  expect(app.components).toStrictEqual({});

  components = createComponents(["Button", "Input"]);
  app.use(components);
  expect(Object.keys(app.components).sort().toString()).toBe("button,input");
});

test("app.use(components) with components in app.config", () => {
  app = createZenithic();
  expect(Object.keys(app.components).sort().toString()).toBe(
    defaultConfig.default.components
      .sort()
      .reduce((acc, c) => [...acc, c.toLowerCase()], [])
      .toString()
  );
});

test("app.mountComponent() with a complex custom component", async () => {
  app = createZenithic();
  window.document.querySelector("body").innerHTML = "";
  const doc = document.createElement("div");
  const mountPoint = document.createElement("div");
  mountPoint.setAttribute("id", "app");
  doc.appendChild(mountPoint);
  window.document.getElementsByTagName("body")[0].appendChild(doc);

  const beforeDestroy = jest.fn();
  const destroyed = jest.fn();
  const Custom: Component = {
    mixins: ["draggable"],
    template: `<div>{{ text }}</div>`,
    props: {
      rate: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        amount: 1000,
        amountWatched: 0,
        previousAmount: 0,
        copyAmount: 0,
      };
    },
    computed: {
      text: (compiledComponent: CompiledComponent, _app: ZenithicApp) => `${
        compiledComponent.amount * compiledComponent.rate
      } ${compiledComponent.currency}`,
    },
    methods: {
      increaseAmount: () => ((this as CompiledComponent).amount += 1000),
    },
    watch: {
      amount: () => {
        (this as CompiledComponent).amountChanged++;
      },
    },
    beforeMount() {
      (this as CompiledComponent).$el.setAttribute("addedBeforeMount", "true");
    },
    mounted() {
      (this as CompiledComponent).$el.setAttribute("mounted", "true");
    },
    updated(key, value, oldValue) {
      if (key === "amount") {
        this.previousAmount = oldValue;
        this.copyAmount = value;
      }
    },
    beforeDestroy() {
      beforeDestroy();
    },
    destroyed() {
      destroyed();
    },
    context: {
      itsacontextprop: true,
    },
  };

  await app.mount("#app", Custom, { rate: 3, currency: "EUR" }).catch(error);
  expect(doc.querySelector("#app").textContent).toBe("3000 EUR");
});

export {};
