import { createZenithic } from "../../../src";
import { querySelector } from "../../utils/dom";

let app;
let doc;
let mountPoint;

const Custom = {
  template: "<div>{{ value | limitTo(3) }}</div>",
  props: {
    value: {
        type: Array,
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

describe("limitTo filter", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ filters: [] });

    app.mount("#app", Custom, {value: [1, 2, 3, 4 ,5]}).then(() => {
      expect(querySelector("#app").textContent).toBe("1,2,3,4,5");
      callback();
    });
  });

  test("should limit the array length to the provided argument", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, {value: [1, 2, 3, 4 ,5]}).then(() => {
        expect(querySelector("#app").textContent).toBe("1,2,3");
        callback();
    });
  });
});

export {};
