import { createZenithic } from "../../../src";
import { querySelector } from "../../utils/dom";

let app;
let doc;
let mountPoint;

const onClickOutside = jest.fn();

const Custom = {
  template: "<div>{{ text | capitalize}}</div>",
  props: {
    text: {
        type: String,
        required: true,
    }
  }
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

describe("capitalize filter", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ filters: [] });

    app.mount("#app", Custom, {text: "test"}).then((mountedApp) => {
      expect(querySelector("#app").textContent).toBe("test");
      callback();
    });
  });

  test("should capitalize text", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, {text: "test"}).then((mountedApp) => {
        expect(querySelector("#app").textContent).toBe("Test");
        callback();
    });
  });
});

export {};
