import { createZenithic } from "../../../src";

let app;
let doc;
let mountPoint;

const Custom = {
  template: `<div>
    <div v-if="shouldIf">showIf</div>
  </div>`,
  data() {
    return {
      shouldIf: true,
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

describe("v-if directive", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ directives: [] });

    app.mount("#app", Custom).then((mountedApp) => {
      expect(mountedApp.main.$el.innerHTML.trim()).toBe(`<div v-if="shouldIf">showIf</div>`);
      callback();
    });
  });

  test("should show if true", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom).then((mountedApp) => {
        expect(mountedApp.main.$el.textContent.trim()).toBe(`showIf`);
        callback();
    });
  });

  test("should hide if false", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom).then((mountedApp) => {
      mountedApp.main.shouldIf = false;
      setTimeout(() => {
      expect(mountedApp.main.$el.textContent.trim()).toBe(``);
        callback();
      }, 0);
    });
  });
});

export {};
