const {
  createZenithic,
  getApp,
  getApps,
  getUtils,
  getComponents,
  getRouter,
  getStore,
  getDirectives,
  getFilters,
  getMixins,
} = require('"../../../src');
const defaultConfig = require("../config");

let app;
let appCount;

const appProperties = [
  "components",
  "context",
  "directives",
  "el",
  "filters",
  "getComponent",
  "main",
  "mixins",
  "mount",
  "registerComponent",
  "registerContext",
  "registerDirective",
  "registerFilter",
  "router",
  "store",
  "unmount",
  "use",
  "utils",
];

beforeEach(() => {
  app = null;
});

beforeAll(() => {
  appCount = 0;
});

test("createZenithic with no config argument", () => {
  app = createZenithic();
  appCount++;
  expect(typeof app).toBe("object");
  expect(Object.keys(app).sort().toString()).toBe(
    appProperties.sort().toString()
  );
});

test("createZenithic with  config argument", () => {
  const config = {
    router: false,
    store: false,
    mixins: ["draggable"],
  };
  app = createZenithic(config);
  appCount++;
  expect(app.store).toBeNull();
  expect(app.router).toBeNull();
  expect(Object.keys(app.mixins)).toStrictEqual(["draggable"]);
});

test("getApp", () => {
  app = createZenithic();
  appCount++;
  const gotApp = getApp();
  expect(typeof gotApp).toBe("object");
  expect(Object.keys(app).sort().toString()).toBe(
    appProperties.sort().toString()
  );
});

test("getApps", () => {
  app = createZenithic();
  appCount++;
  const apps = getApps();
  expect(apps.length).toBe(appCount);
});

test("getUtils", () => {
  const utils = getUtils();
  expect(typeof utils).toBe("object");
  expect(Object.keys(utils).sort().toString()).toBe(
    defaultConfig.default.utils.sort().toString()
  );
});

test("getComponents", () => {
  const components = getComponents();
  expect(typeof components).toBe("object");
  expect(Object.keys(components).sort().toString()).toBe(
    defaultConfig.default.components.sort().toString()
  );
});

test("getRouter", () => {
  const router = getRouter();
  expect(typeof router).toBe("object");
});

test("getStore", () => {
  const store = getStore();
  expect(typeof store).toBe("object");
});

test("getDirectives", () => {
  const directives = getDirectives();
  expect(typeof directives).toBe("object");
});

test("getFilters", () => {
  const filters = getFilters();
  expect(typeof filters).toBe("object");
});

test("getMixins", () => {
  const mixins = getMixins();
  expect(typeof mixins).toBe("object");
});

export {};