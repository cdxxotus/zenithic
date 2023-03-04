const { createZenithic } = require('"../../../src');
const { createUtils } = require("../../utils");
const defaultConfig = require("../../config");

let app;
let utils;

beforeAll(() => {
  utils = createUtils();
});

beforeEach(() => {
  app = null;
});

describe("createUtils function", () => {
  test("should return a Plugin", () => {
    expect(typeof utils).toBe("object");
    expect(Object.keys(utils).includes("install")).toBeTruthy();
    expect(Object.keys(utils).length).toBe(1);
  });
})

describe("app.use(utils) method", () => {
  test("with no utils in app.config or createUtils.config", () => {
    app = createZenithic({ utils: [] });
    expect(Object.keys(app.utils)).toStrictEqual([]);
  
    app.use(utils);
    expect(Object.keys(app.utils)).toStrictEqual([]);
  });
  
  test("with no utils in app.config but in createUtils.config", () => {
    app = createZenithic({ utils: [] });
    expect(Object.keys(app.utils)).toStrictEqual([]);
  
    utils = createUtils(["dom"]);
    app.use(utils);
    expect(Object.keys(app.utils)).toStrictEqual(["dom"]);
  });
  
  test("with utils in app.config", () => {
    app = createZenithic();
    const utilsList = defaultConfig.default.utils.sort().toString();
    expect(Object.keys(app.utils).sort().toString()).toBe(utilsList);
  });
})

export {};