import { CompiledComponent } from "../types/components";
import { ZenithicApp } from "../types/core";

const { createZenithic } = require("../../src");
const { createApp } = require("../core");
const { Button } = require("../components/Button");
const { DatePicker } = require("../components/DatePicker");

let app: ZenithicApp;
let doc;
let mountPoint;

beforeEach(() => {
  window.document.querySelector("body").innerHTML = "";
  app = createZenithic({ components: ["Button"] });
  doc = document.createElement("div");
  mountPoint = document.createElement("div");
  mountPoint.setAttribute("id", "app");
  doc.appendChild(mountPoint);
  window.document.getElementsByTagName("body")[0].appendChild(doc);
});

test("createApp", () => {
  const app2 = createApp();
  expect(typeof app).toBe("object");
});

test("app.mount()", async () => {
  await app.mount("#app", Button, { text: "Hello noob" });
  expect(doc.querySelector("#app").textContent).toBe("Hello noob");
});

test("app.registerComponent()", async () => {
  expect(Object.keys(app.components).includes("datepicker")).toBeFalsy();

  app.registerComponent("DatePicker", DatePicker);
  expect(Object.keys(app.components).includes("datepicker")).toBeTruthy();

  const Custom = {
    template: `<div>{{ text }}</div>`,
    props: {
      text: {
        type: String,
        required: true,
      },
    },
  };

  const App = {
    template: `<div><Custom text="'test'"></Custom></div>`,
  };

  app.registerComponent("Custom", Custom);

  await app.mount("#app", App);

  expect(doc.querySelector("#app").textContent).toBe("test");
});

test("app.getComponent()", () => {
  expect(typeof app.getComponent("Button")).toBe("object");
});

test("app.registerDirective()", async () => {
  const TestComponent = {
    template: `
        <div v-directive1="hometown">My hometown is:</div>
        `,
    data() {
      return {
        hometown: "Annecy",
      };
    },
  };

  app.registerDirective("directive1", {
    parseValue(str: string) {
      return this[str];
    },
    beforeMount(el, binding) {
      el.textContent = el.textContent + " " + binding.value;
    },
  });
  expect(Object.keys(app.directives).includes("directive1")).toBeTruthy();

  await app.mount("#app", TestComponent, {});
  expect(doc.querySelector("#app").textContent).toBe("My hometown is: Annecy");
});

test("app.registerFilter()", async () => {
  app = createZenithic();
  const filter1 = (value: string[]) =>
    value.filter((v) => v !== "vue" && v !== "react").toString();
  app.registerFilter("filter1", filter1);
  expect(Object.keys(app.filters).includes("filter1")).toBeTruthy();

  const TestComponent = {
    template: `
        <div>{{ frameworks | filter1 }}</div>
        `,
    data() {
      return {
        frameworks: ["react", "vue", "zenithic"],
      };
    },
  };

  await app.mount("#app", TestComponent, {});
  expect(doc.querySelector("#app").textContent).toBe("zenithic");
});

test("app.setContext()", async () => {
  const TestComponent = {
    template: `
        <div>{{ prop1 }}</div>
        `,
  };

  app.setContext({ prop1: "noob" });
  expect(app.context.prop1).toBe("noob");

  await app.mount("#app", TestComponent);
  expect(doc.querySelector("#app").textContent).toBe("noob");
});

test("app.unmount()", () => {
  app.unmount();
  expect(doc.querySelector("#app").textContent).toBe("");
});

test("app.mount() - pass component props", async () => {
  const Custom = {
    template: `<div>{{ text }}</div>`,
    props: {
      text: {
        type: String,
        required: true,
      },
    },
  };

  await app.mount("#app", Custom, { text: "test" });
  expect(doc.querySelector("#app").textContent).toBe("test");
});

test("app: update component data by clicking on a button", (callback) => {
  const TestComponent = {
    template: `
          <div id="clickMe" v-on:click="increment">{{ count }}</div>
          `,
    data() {
      return {
        count: 0,
      };
    },
    methods: {
      increment() {
        (this as CompiledComponent).count++;
      },
    },
  };

  app = createZenithic({ components: [], directives: ["on"] });
  app.mount("#app", TestComponent, {}).then(() => {
    expect(doc.querySelector("#app").textContent).toBe("0");

    const clickMe = window.document.querySelector("#clickMe") as HTMLDivElement;
    clickMe.click();

    setTimeout(() => {
      expect(doc.querySelector("#app").textContent).toBe("1");
      callback();
    }, 0);
  });
});

export {};
