import { createZenithic } from "../../../src";
import { querySelector } from "../../utils/dom";

let app;
let doc;
let mountPoint;

const Custom = {
  template: "<div>{{ value | date('DD/MM/YYYY')}}</div>",
  props: {
    value: {
        type: Date,
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

describe("date filter", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ filters: [] });

    app.mount("#app", Custom, {value: date}).then(() => {
      expect(querySelector("#app").textContent === "04/03/2023").toBeFalsy();
      callback();
    });
  });

  test("should format date", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, {value: date}).then(() => {
        expect(querySelector("#app").textContent).toBe("04/03/2023");
        callback();
    });
  });
});

export {};
