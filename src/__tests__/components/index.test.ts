const { createZenithic } = require('"../../../src');
const { createComponents } = require("../../components");
const defaultConfig = require("../../config");

let app;
let components;

beforeAll(() => {
  components = createComponents();
});

beforeEach(() => {
  app = null;
});

test("createComponents", () => {
  expect(typeof components).toBe("object");
  expect(Object.keys(components).includes("install")).toBeTruthy();
  expect(Object.keys(components).length).toBe(1);
});

test("app.use(components) with no components in app.config or createComponents.config", () => {
  app = createZenithic({ components: [] });
  expect(app.components).toStrictEqual({});

  app.use(components);
  expect(app.components).toStrictEqual({});
});

test("app.use(components) with no components in app.config but in createComponents.config", () => {
  app = createZenithic({ components: [] });
  expect(app.components).toStrictEqual({});

  components = createComponents(["Button", "Input"]);
  app.use(components);
  expect(Object.keys(app.components).sort().toString()).toBe("button,input");
});

test("app.use(components) with components in app.config", () => {
  app = createZenithic();
  expect(Object.keys(app.components).sort().toString()).toBe(
    defaultConfig.default.components
      .sort()
      .reduce((acc, c) => [...acc, c.toLowerCase()], [])
      .toString()
  );
});

export {};
