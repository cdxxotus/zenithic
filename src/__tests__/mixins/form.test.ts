import { createZenithic } from "../../../src";
import { merge } from "../../utils/object";

let app;
let doc;
let mountPoint;

const fields = {
  username: {
    isValid: false,
    validators: [(value) => ({ isValid: value?.length === 4, error: "" })],
    value: "hello",
  },
};

const Custom = {
  mixins: ["form"],
  template: `
  <div>
    <input name="username" value="state.form.fields.username.value">
  </div>
  `,
  data() {
    return {
      form: { fields },
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

describe("form mixin", () => {
  test("should not provide new methods if not part of the configuration", (callback) => {
    app = createZenithic({ mixins: [] });
    expect(app.mixins).toStrictEqual({});

    app.mount("#app", Custom, {}).then((mountedApp) => {
      expect(mountedApp.main.validateFormField).toBeUndefined();
      callback();
    });
  });

  test("should provide new methods and properties to the component", (callback) => {
    app = createZenithic();

    const expectedForm = {
      fields: fields,
      errors: {},
      isValid: false,
      isSubmitted: false,
      submitError: null,
      submitSuccess: null,
    };

    app.mount("#app", Custom, {}).then((mountedApp) => {
      expect(mountedApp.main.validateFormField).toBeDefined();
      expect(mountedApp.main.validateForm).toBeDefined();
      expect(mountedApp.main.submitForm).toBeDefined();
      expect(mountedApp.main.resetForm).toBeDefined();
      expect(mountedApp.main.form).toStrictEqual(expectedForm);
      callback();
    });
  });

  test("should return true if field is valid, false otherwise", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom, {}).then((mountedApp) => {
      setTimeout(() => {
        expect(mountedApp.main.form.fields.username.isValid).toBeFalsy();
        mountedApp.main.validateFormField("username");
        expect(mountedApp.main.form.fields.username.isValid).toBeFalsy();
        // TODO: fixme
        // v-model directive should handle the state change with element.value = 'dani'
        mountedApp.main.form = merge(mountedApp.main.form, {
          fields: { username: { value: "dani" } },
        });
        mountedApp.main.validateFormField("username");
        expect(mountedApp.main.form.fields.username.isValid).toBeTruthy();
        callback();
      }, 0);
    });
  });
});

export {};
