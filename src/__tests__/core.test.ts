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

describe("createApp function", () => {
  test("should return an object", () => {
    const app2 = createApp();
    expect(typeof app).toBe("object");
  });
});

describe("app.mount method", () => {
  test("should mount the component with the props passed as an argument", async () => {
    await app.mount("#app", Button, { text: "Hello noob" });
    expect(doc.querySelector("#app").textContent).toBe("Hello noob");
  });
});

describe("app.registerComponent method", () => {
  test("should add a component to the app components", () => {
    expect(Object.keys(app.components).includes("datepicker")).toBeFalsy();

    app.registerComponent("DatePicker", DatePicker);
    expect(Object.keys(app.components).includes("datepicker")).toBeTruthy();
  });

  test("should be able to use the component in a template", async () => {
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
});

describe("app.getComponent method", () => {
  test("should return an object", () => {
    expect(typeof app.getComponent("Button")).toBe("object");
  });
});

describe("app.registerDirective method", () => {
  test("should add a direcive to the app direcives and make it available to use in a template", async () => {
    app.registerDirective("directive1", {
      parseValue(str: string) {
        return this[str];
      },
      beforeMount(el, binding) {
        el.textContent = el.textContent + " " + binding.value;
      },
    });
    expect(Object.keys(app.directives).includes("directive1")).toBeTruthy();

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
    await app.mount("#app", TestComponent, {});
    expect(doc.querySelector("#app").textContent).toBe(
      "My hometown is: Annecy"
    );
  });
});

describe("app.registerFilter method", () => {
  test("should add the filter to the app filters and make it available to use in a template", async () => {
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
});

describe("app.setContext method", () => {
  test("should add the context to the app and pass it as props to main component", async () => {
    app.setContext({ prop1: "noob" });
    expect(app.context.prop1).toBe("noob");

    const TestComponent = {
      template: `
          <div>{{ prop1 }}</div>
          `,
    };

    await app.mount("#app", TestComponent);
    expect(doc.querySelector("#app").textContent).toBe("noob");
  });
});

describe("app.unmount method", () => {
  test("should remove the app from the DOM", () => {
    app.unmount();
    expect(doc.querySelector("#app").textContent).toBe("");
  });
});

describe("app.mount method", () => {
  test("should handle props as arguments", async () => {
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

  test("should re-render elements when parent state change", (callback) => {
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

      const clickMe = window.document.querySelector(
        "#clickMe"
      ) as HTMLDivElement;
      clickMe.click();

      setTimeout(() => {
        expect(doc.querySelector("#app").textContent).toBe("1");
        callback();
      }, 0);
    });
  });
});

export {};
