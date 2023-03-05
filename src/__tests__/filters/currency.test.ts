import { createZenithic } from "../../../src";
import { querySelector } from "../../utils/dom";

let app;
let doc;
let mountPoint;

const Custom = {
  template: "<div>{{ value | currency('fr-FR', 'eur')}}</div>",
  props: {
    value: {
        type: Number,
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

describe("currency filter", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ filters: [] });

    app.mount("#app", Custom, {value: 100}).then(() => {
      expect(querySelector("#app").textContent).toBe("100");
      callback();
    });
  });

  test("should capitalize text", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, {value: 100}).then(() => {
        expect(querySelector("#app").textContent).toBe("100,00 €");
        callback();
    });
  });
});

export {};
