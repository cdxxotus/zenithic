import { createZenithic } from "../../../src";
import { createMixins } from "../../mixins";
import defaultConfig from "../../config";

let app;
let doc;
let mountPoint;

const Custom = {
  mixins: ["clickOutside"],
  template: "<div>hello</div>",
};

beforeEach(() => {
  app = null;
  window.document.querySelector("body").innerHTML = "";
  app = createZenithic({ components: ["Button"] });
  doc = document.createElement("div");
  mountPoint = document.createElement("div");
  mountPoint.setAttribute("id", "app");
  doc.appendChild(mountPoint);
  window.document.getElementsByTagName("body")[0].appendChild(doc);
});

describe("clickOutside mixin", () => {
  test("should not provide new methods if not part of the configuration", (callback) => {
    app = createZenithic({ mixins: [] });
    expect(app.mixins).toStrictEqual({});

    app.mount("#app", Custom, {}).then((mountedApp) => {
      expect(mountedApp.main.handleClickOutside).toBeUndefined();
      callback();
    });
  });

  test("should provide new methods to the component", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, {}).then((mountedApp) => {
      expect(mountedApp.main.handleClickOutside).toBeDefined();
      callback();
    });
  });
});

export {};
