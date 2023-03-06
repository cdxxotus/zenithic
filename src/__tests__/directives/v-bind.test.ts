import { createZenithic } from "../../../src";

let app;
let doc;
let mountPoint;

const Custom = {
  template: `<div v-bind:isBinded="value">Hello</div>`,
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
};

beforeEach(() => {
  app = null;
  window.document.querySelector("body").innerHTML = "";
  app = createZenithic();
  doc = document.createElement("div");
  mountPoint = document.createElement("div");
  mountPoint.setAttribute("id", "app");
  doc.appendChild(mountPoint);
  window.document.getElementsByTagName("body")[0].appendChild(doc);
});

describe("v-bind directive", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ directives: [] });

    app.mount("#app", Custom, { value: true }).then((mountedApp) => {
      expect(mountedApp.main.$el.getAttribute("isBinded")).toBe(null);
      callback();
    });
  });

  test("should bind the value to an argument", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, { value: true }).then((mountedApp) => {
      expect(mountedApp.main.$el.getAttribute("isBinded")).toBeTruthy();
      callback();
    });
  });
});

export {};
