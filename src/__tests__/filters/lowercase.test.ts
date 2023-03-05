import { createZenithic } from "../../../src";
import { querySelector } from "../../utils/dom";

let app;
let doc;
let mountPoint;

const Custom = {
  template: "<div>{{ value | lowercase }}</div>",
  props: {
    value: {
        type: String,
        required: true,
    }
  }
};

const date = new Date('2023-03-04T12:34:56Z');

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

describe("lowercase filter", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ filters: [] });

    app.mount("#app", Custom, {value: "HELLO"}).then(() => {
      expect(querySelector("#app").textContent).toBe("HELLO");
      callback();
    });
  });

  test("should lowercase the string", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, {value: "HELLO"}).then(() => {
        expect(querySelector("#app").textContent).toBe("hello");
        callback();
    });
  });
});

export {};
