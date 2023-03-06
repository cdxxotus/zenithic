import { createZenithic } from "../../../src";

let app;
let doc;
let mountPoint;

const Custom = {
  template: `<ul v-for="item in items"><li>{{ item }}</li></ul>`,
  props: {
    items: {
      type: Array,
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

describe("v-for directive", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ directives: [] });

    app.mount("#app", Custom, { value: true }).then((mountedApp) => {
      expect(mountedApp.main.$el.outerHTML).toBe(`<ul v-for="item in items"><li>((--@@ item @@--))</li></ul>`);
      callback();
    });
  });

  test("should iterate through items and generate children", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, { items: ["first", "second", "third"] }).then((mountedApp) => {
        expect(mountedApp.main.$el.outerHTML).toBe("<ul><li>first</li><li>second</li><li>third</li></ul>");
        callback();
    });
  });
});

export {};
