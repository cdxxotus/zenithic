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

describe("createComponents function", () => {
  test("should return an object", () => {
    expect(typeof components).toBe("object");
    expect(Object.keys(components).includes("install")).toBeTruthy();
    expect(Object.keys(components).length).toBe(1);
  });
})

describe("app.use(componentsPlugin) method", () => {
  test("with no components in app.config or createComponents.config", () => {
    app = createZenithic({ components: [] });
    expect(app.components).toStrictEqual({});
  
    app.use(components);
    expect(app.components).toStrictEqual({});
  });
  
  test("with no components in app.config but in createComponents.config", () => {
    app = createZenithic({ components: [] });
    expect(app.components).toStrictEqual({});
  
    components = createComponents(["Button", "Input"]);
    app.use(components);
    expect(Object.keys(app.components).sort().toString()).toBe("button,input");
  });
  
  test("with components in app.config", () => {
    app = createZenithic();
    expect(Object.keys(app.components).sort().toString()).toBe(
      defaultConfig.default.components
        .sort()
        .reduce((acc, c) => [...acc, c.toLowerCase()], [])
        .toString()
    );
  });
})

describe("app.mountComponent method", () => {
  test("should handle all the component props available in Zenithic", (callback) => {
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
      template: `<div id="here" v-on:click="increaseAmount">{{ text }}</div>`,
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
          amountChanged: 0,
          previousAmount: 0,
          copyAmount: 0,
        };
      },
      computed: {
        text: (compiledComponent: CompiledComponent, _app: ZenithicApp) =>
          `${compiledComponent.amount * compiledComponent.rate} ${
            compiledComponent.currency
          }`,
      },
      methods: {
        increaseAmount() {
          (this as CompiledComponent).amount += 1000;
        },
      },
      watch: {
        amount() {
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
  
    const appElement = doc.querySelector("#app");
    app
      .mount("#app", Custom, { rate: 3, currency: "EUR" })
      .then((mountedApp) => {
        // test computed
        expect(appElement.textContent).toBe("3000 EUR");
  
        // test beforeMount
        expect(
          appElement.firstElementChild.getAttribute("addedBeforeMount")
        ).toBeTruthy();
  
        // test mounted
        expect(appElement.firstElementChild.getAttribute("mounted")).toBeTruthy();
  
        (appElement.querySelector("#here") as HTMLDivElement).click();
        setTimeout(() => {
          // test methods
          expect(appElement.textContent).toBe("6000 EUR");
  
          // test watch
          expect(mountedApp.main.amountChanged).toBe(1);
  
          // test updated
          expect(mountedApp.main.previousAmount).toBe(1000);
          expect(mountedApp.main.copyAmount).toBe(2000);
  
          // test context
          expect(mountedApp.main.itsacontextprop).toBeTruthy();
  
          // test mixins
          /// expect().to()
          /////
  
          // test unmount
          app.unmount();
          expect(appElement.textContent).toBe("");
  
          // test beforeDestroy
          expect(beforeDestroy).toHaveBeenCalledTimes(1);
  
          // test destroyed
          expect(destroyed).toHaveBeenCalledTimes(1);
  
          callback();
        }, 0);
      });
  });
})

export {};
