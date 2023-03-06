import { createZenithic } from "../../../src";

let app;
let doc;
let mountPoint;

const Custom = {
  template: `<div>
    <div v-if="shouldIf">showIf</div>
    <div v-else-if="shouldElseIf">showElseIf</div>
  </div>`,
  data() {
    return {
      shouldIf: false,
      shouldElseIf: true,
    };
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

describe("v-else-if directive", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ directives: [] });

    app.mount("#app", Custom).then((mountedApp) => {
      expect(mountedApp.main.$el.textContent.includes("showIf")).toBeTruthy();
      expect(
        mountedApp.main.$el.textContent.includes("showElseIf")
      ).toBeTruthy();
      callback();
    });
  });

  test("should only show the v-if-else element", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom).then((mountedApp) => {
      expect(mountedApp.main.$el.textContent.trim()).toBe("showElseIf");
      callback();
    });
  });

  test("should hide the v-if-else element", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom).then((mountedApp) => {
      mountedApp.main.shouldElseIf = false;
      setTimeout(() => {
        expect(mountedApp.main.$el.textContent.trim()).toBe("");
        callback();
      }, 0);
    });
  });
});

export {};
