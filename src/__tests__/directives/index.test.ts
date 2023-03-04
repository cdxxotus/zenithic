const { createZenithic } = require('"../../../src');
const { createDirectives } = require("../../directives");
const defaultConfig = require("../../config");

let app;
let directives;

beforeAll(() => {
    directives = createDirectives();
});

beforeEach(() => {
  app = null;
});

describe("createDirectives function", () => {
  test("should return a Plugin", () => {
    expect(typeof directives).toBe("object");
    expect(Object.keys(directives).includes("install")).toBeTruthy();
    expect(Object.keys(directives).length).toBe(1);
  });
})

describe("app.use(directivesPlugin) method", () => {
  test("with no directives in app.config or createDirectives.config", () => {
    app = createZenithic({ directives: [] });
    expect(app.directives).toStrictEqual({});
  
    app.use(directives);
    expect(app.directives).toStrictEqual({});
  });
  
  test("with no directives in app.config but in createDirectives.config", () => {
    app = createZenithic({ directives: [] });
    expect(app.directives).toStrictEqual({});
  
    directives = createDirectives(["bind", "show"]);
    app.use(directives);
    expect(Object.keys(app.directives).sort().toString()).toBe("bind,show");
  });
  
  test("with directives in app.config", () => {
    app = createZenithic();
    expect(Object.keys(app.directives).sort().toString()).toBe(defaultConfig.default.directives.sort().toString());
  });
})

export {};