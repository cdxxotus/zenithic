import { createZenithic } from "../../../src";

let app;
let doc;
let mountPoint;

const Custom = {
  template: `<div>
    <div v-if="shouldIf">show1</div>
    <div v-else-if="shouldElseIf">show2</div>
    <div v-else>show3</div>
  </div>`,
  data() {
    return {
      shouldIf: false,
      shouldElseIf: false,
      shouldElse: true,
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

describe("v-else directive", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ directives: [] });

    app.mount("#app", Custom).then((mountedApp) => {
      expect(mountedApp.main.$el.textContent.includes("show1")).toBeTruthy();
      expect(mountedApp.main.$el.textContent.includes("show2")).toBeTruthy();
      expect(mountedApp.main.$el.textContent.includes("show3")).toBeTruthy();
      callback();
    });
  });

  test("should only show the v-else element", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom).then((mountedApp) => {
      expect(mountedApp.main.$el.textContent.trim()).toBe("show3");
      callback();
    });
  });

  test("should hide the v-else element", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom).then((mountedApp) => {
      mountedApp.main.shouldIf = true;
      setTimeout(() => {
        expect(mountedApp.main.$el.textContent.trim()).toBe("show1");
        callback();
      }, 0);
    });
  });
});

export {};
