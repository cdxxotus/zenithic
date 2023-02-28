const { createZenithic } = require('"../../../src');
const { createMixins } = require("../../mixins");
const defaultConfig = require("../../config");

let app;
let mixins;

beforeAll(() => {
  mixins = createMixins();
});

beforeEach(() => {
  app = null;
});

test("createMixins", () => {
  expect(typeof mixins).toBe("object");
  expect(Object.keys(mixins).includes("install")).toBeTruthy();
  expect(Object.keys(mixins).length).toBe(1);
});

test("app.use(mixins) with no mixins in app.config or createMixins.config", () => {
  app = createZenithic({ mixins: [] });
  expect(app.mixins).toStrictEqual({});

  app.use(mixins);
  expect(app.mixins).toStrictEqual({});
});

test("app.use(mixins) with no mixins in app.config but in createMixins.config", () => {
  app = createZenithic({ mixins: [] });
  expect(app.mixins).toStrictEqual({});

  mixins = createMixins(["draggable", "focus"]);
  app.use(mixins);
  expect(Object.keys(app.mixins).sort().toString()).toBe("draggable,focus");
});

test("app.use(mixins) with mixins in app.config", () => {
  app = createZenithic();
  expect(Object.keys(app.mixins).sort().toString()).toBe(defaultConfig.default.mixins.sort().toString());
});
