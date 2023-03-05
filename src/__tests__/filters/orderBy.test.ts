import { createZenithic } from "../../../src";
import { querySelector } from "../../utils/dom";

let app;
let doc;
let mountPoint;

const Custom = {
  template: `<ul>
  <li v-for="item in value | orderBy('name')">{{ item.name }}</li>
</ul>`,
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
};

const value = [{ name: "james" }, { name: "alex" }, { name: "dani" }];

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

describe("orderBy filter", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ filters: [] });

    app.mount("#app", Custom, { value }).then(() => {
      expect(querySelector("#app").textContent.trim()).toBe("jamesalexdani");
      callback();
    });
  });

  test("should sort the array by the provided argument", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, { value }).then(() => {
      expect(querySelector("#app").textContent.trim()).toBe("alexdanijames");
      callback();
    });
  });
});

export {};
