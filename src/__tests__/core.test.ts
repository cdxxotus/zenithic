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
  app.registerDirective("directive1", () => {});
  expect(Object.keys(app.directives).includes("directive1")).toBeTruthy();
});

test("app.registerFilter()", () => {
  app.registerFilter("filter1", () => {});
  expect(Object.keys(app.filters).includes("filter1")).toBeTruthy();
});

test("app.registerContext()", () => {
  app.registerContext({ prop1: "noob" });
  expect(app.context.prop1).toBe("noob");
});

test("app.unmount()", () => {
    app.unmount();  
    expect(doc.querySelector("#app").textContent).toBe("");
  });

test("app: update component data by clicking on a button", () => {
  const TestComponent = {
    template: `
        <div id="clickMe" test="true" v-on:click="increment">{{ count }}</div>
        `,
    data() {
        return {
            count: 0
        }
    },
    methods: {
        increment: () => {
            console.log('daniiiiiiii');
            // this.count = this.count + 1
        }
    }
  };

  
  app = createZenithic({ components: [], directives: ["on"] });
  app.mount("#app", TestComponent, { });
  
  expect(doc.querySelector("#app").textContent).toBe("0");

  const clickMe = (window.document.querySelector('#clickMe') as HTMLDivElement);
  clickMe.click();

  expect(doc.querySelector("#app").textContent).toBe("1");
});
