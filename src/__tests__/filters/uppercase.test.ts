import { createZenithic } from "../../../src";
import { querySelector } from "../../utils/dom";

let app;
let doc;
let mountPoint;

const Custom = {
  template: "<div>{{ value | uppercase }}</div>",
  props: {
    value: {
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

describe("uppercase filter", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ filters: [] });

    app.mount("#app", Custom, {value: "hello"}).then(() => {
      expect(querySelector("#app").textContent).toBe("hello");
      callback();
    });
  });

  test("should uppercase the string", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, {value: "hello"}).then(() => {
        expect(querySelector("#app").textContent).toBe("HELLO");
        callback();
    });
  });
});

export {};
