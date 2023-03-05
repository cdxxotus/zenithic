import { createZenithic } from "../../../src";
import { createMixins } from "../../mixins";
import defaultConfig from "../../config";

let app;
let mixins;

beforeAll(() => {
  mixins = createMixins();
});

beforeEach(() => {
  app = null;
});

describe("createMixins function", () => {
  test("should return a Plugin", () => {
    expect(typeof mixins).toBe("object");
    expect(Object.keys(mixins).includes("install")).toBeTruthy();
    expect(Object.keys(mixins).length).toBe(1);
  });
})

describe("app.use(mixinsPlugin) method", () => {
  test("with no mixins in app.config or createMixins.config", () => {
    app = createZenithic({ mixins: [] });
    expect(app.mixins).toStrictEqual({});
  
    app.use(mixins);
    expect(app.mixins).toStrictEqual({});
  });
  
  test("with no mixins in app.config but in createMixins.config", () => {
    app = createZenithic({ mixins: [] });
    expect(app.mixins).toStrictEqual({});
  
    mixins = createMixins(["draggable", "focus"]);
    app.use(mixins);
    expect(Object.keys(app.mixins).sort().toString()).toBe("draggable,focus");
  });
  
  test("with mixins in app.config", () => {
    app = createZenithic();
    expect(Object.keys(app.mixins).sort().toString()).toBe(defaultConfig.mixins.sort().toString());
  });
})

export {};