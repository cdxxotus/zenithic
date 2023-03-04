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
  "$el",
  "compiledComponents",
  "components",
  "context",
  "directives",
  "filters",
  "getComponent",
  "main",
  "mixins",
  "mount",
  "mountComponent",
  "registerComponent",
  "registerDirective",
  "registerFilter",
  "router",
  "setContext",
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

describe("createZenithic function", () => {
  test("with no config argument", () => {
    app = createZenithic();
    appCount++;
    expect(typeof app).toBe("object");
    expect(Object.keys(app).sort().toString()).toBe(
      appProperties.sort().toString()
    );
  });
  
  test("with  config argument", () => {
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
})

describe("getApp function", () => {
  test("should return an object with strict properties", () => {
    app = createZenithic();
    appCount++;
    const gotApp = getApp();
    expect(typeof gotApp).toBe("object");
    expect(Object.keys(app).sort().toString()).toBe(
      appProperties.sort().toString()
    );
  });
})

describe("getApps function", () => {
  test("should return an array of apps created until now", () => {
    app = createZenithic();
    appCount++;
    const apps = getApps();
    expect(apps.length).toBe(appCount);
  });
})

describe("getUtils function", () => {
  test("should return an object of utils", () => {
    const utils = getUtils();
    expect(typeof utils).toBe("object");
    expect(Object.keys(utils).sort().toString()).toBe(
      defaultConfig.default.utils.sort().toString()
    );
  });
})

describe("getComponents function", () => {
  test("should return an object of components", () => {
    const components = getComponents();
    expect(typeof components).toBe("object");
    expect(Object.keys(components).sort().toString()).toBe(
      defaultConfig.default.components.sort().reduce((acc, v) => [...acc, v.toLowerCase()], []).toString()
    );
  });
})

describe("getRouter function", () => {
  test("should return an object", () => {
    const router = getRouter();
    expect(typeof router).toBe("object");
  });
})

describe("getStore function", () => {
  test("should return an object", () => {
    const store = getStore();
    expect(typeof store).toBe("object");
  });
})

describe("getDirectives function", () => {
  test("should return an object", () => {
    const directives = getDirectives();
    expect(typeof directives).toBe("object");
  });
})

describe("getFilters function", () => {
  test("should return an object", () => {
    const filters = getFilters();
    expect(typeof filters).toBe("object");
  });
})

describe("getMixins function", () => {
  test("should return an object", () => {
    const mixins = getMixins();
    expect(typeof mixins).toBe("object");
  });
})

export {};