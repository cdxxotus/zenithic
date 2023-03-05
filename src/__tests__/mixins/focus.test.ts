import { createZenithic } from "../../../src";

let app;
let doc;
let mountPoint;

const Custom = {
  mixins: ["focus"],
  template: `<div tabindex="0">hello</div>`, // you need tabindex attribute to focus() a DIV element
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

describe("focus mixin", () => {
  test("should not trigger mixin lifcecyle events if not included in configuration", (callback) => {
    app = createZenithic({ mixins: [] });
    expect(app.mixins).toStrictEqual({});

    app.mount("#app", Custom, {}).then((mountedApp) => {
      expect(document.activeElement === mountedApp.main.$el).toBeFalsy();
      callback();
    });
  });

  test("should provide trigger lifecycle events", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, {}).then((mountedApp) => {
        expect(document.activeElement === mountedApp.main.$el).toBeTruthy();
      callback();
    });
  });

});

export {};
