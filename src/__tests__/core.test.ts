import { CompiledComponent } from "../types/components";

const { createZenithic } = require("../../src");
const { createApp } = require("../core");
const { Button } = require("../components/Button");
const { DatePicker } = require("../components/DatePicker");

let app;
let doc;
let mountPoint;

beforeAll(() => {
  app = createApp({ components: ["button"] });
  doc = document.createElement("div");
  mountPoint = document.createElement("div");
  mountPoint.setAttribute("id", "app");
  doc.appendChild(mountPoint);
  window.document.getElementsByTagName("body")[0].appendChild(doc);
});

test("createApp", () => {
  expect(typeof app).toBe("object");
});

test("app.mount()", () => {
  app.mount("#app", Button, { text: "Hello noob" });
  expect(doc.querySelector("#app").textContent).toBe("Hello noob");
});

test("app.registerComponent()", () => {
  expect(Object.keys(app.components).includes("DatePicker")).toBeFalsy();
  app.registerComponent("DatePicker", DatePicker);
  expect(Object.keys(app.components).includes("DatePicker")).toBeTruthy();
});

test("app.getComponent()", () => {
  expect(typeof app.getComponent("DatePicker")).toBe("object");
});

test("app.registerDirective()", () => {
  const TestComponent = {
    template: `
        <div v-directive1="hometown">My hometown is:</div>
        `,
    data() {
      return {
        hometown: "Annecy",
      };
    }
  };

  app = createZenithic();
  app.registerDirective("directive1", {
    parseValue(str: string) {
      return this[str];
    },
    beforeMount(el, binding) {
      el.textContent = el.textContent + " " + binding.value;
    }
  });
  expect(Object.keys(app.directives).includes("directive1")).toBeTruthy();

  app.mount("#app", TestComponent, {});
  expect(doc.querySelector("#app").textContent).toBe("My hometown is: Annecy");
});

test("app.registerFilter()", () => {
  app = createZenithic();
  const filter1 = (value: string[]) => value.filter(v => v !== "vue" && v!== "react").toString()
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
    }
  };

  app.mount("#app", TestComponent, {});
  expect(doc.querySelector("#app").textContent).toBe("zenithic");
});

test("app.setContext()", () => {
  app.setContext({ prop1: "noob" });
  expect(app.context.prop1).toBe("noob");
});

test("app.unmount()", () => {
  app.unmount();
  expect(doc.querySelector("#app").textContent).toBe("");
});

test("app.mount() - pass component props", () => {

});

test("app: update component data by clicking on a button", () => {
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
  app.mount("#app", TestComponent, {});

  expect(doc.querySelector("#app").textContent).toBe("0");

  const clickMe = window.document.querySelector("#clickMe") as HTMLDivElement;
  clickMe.click();

  expect(doc.querySelector("#app").textContent).toBe("1");
});

export {};
