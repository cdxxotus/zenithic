import { createZenithic } from "../../../src";
import { querySelector } from "../../utils/dom";

let app;
let doc;
let mountPoint;

const Custom = {
  mixins: ["draggable"],
  template: "<div>hello</div>",
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

describe("draggable mixin", () => {
  test("should not provide new methods if not part of the configuration", (callback) => {
    app = createZenithic({ mixins: [] });
    expect(app.mixins).toStrictEqual({});

    app.mount("#app", Custom, {}).then((mountedApp) => {
      expect(mountedApp.main.handleMouseDown).toBeUndefined();
      callback();
    });
  });

  test("should provide new methods and properties to the component", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, {}).then((mountedApp) => {
      expect(mountedApp.main.handleMouseDown).toBeDefined();
      expect(mountedApp.main.handleMouseUp).toBeDefined();
      expect(mountedApp.main.handleMouseMove).toBeDefined();
      expect(mountedApp.main.isDragging).toBeFalsy();
      expect(mountedApp.main.dragX).toBe(0);
      expect(mountedApp.main.dragY).toBe(0);
      expect(mountedApp.main.initialX).toBe(0);
      expect(mountedApp.main.initialY).toBe(0);
      callback();
    });
  });

  test("should trigger set isDragging: true on mouse down on main when no handle provided", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, {}).then((mountedApp) => {
      mountedApp.main.$el.dispatchEvent(new Event("mousedown"));
      setTimeout(() => {
        expect(mountedApp.main.isDragging).toBeTruthy();
        callback();
      }, 0);
    });
  });

  test("should trigger set isDragging: true on mouse down when providing a handle", (callback) => {
    const Custom = {
      mixins: ["draggable"],
      template: `<div id="handle">hello</div>`,
      data() {
        return {
          draggableHandleSelector: "#handle",
        };
      },
    };

    app = createZenithic();

    app.mount("#app", Custom, {}).then((mountedApp) => {
    querySelector('#handle').dispatchEvent(new Event("mousedown"));
      setTimeout(() => {
        expect(mountedApp.main.isDragging).toBeTruthy();
        callback();
      }, 0);
    });
  });
});

export {};
