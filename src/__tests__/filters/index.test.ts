const { createZenithic } = require('"../../../src');
const { createFilters } = require("../../filters");
const defaultConfig = require("../../config");

let app;
let filters;

beforeAll(() => {
    filters = createFilters();
});

beforeEach(() => {
  app = null;
});

describe("createFilters function", () => {
  test("should return a Plugin", () => {
    expect(typeof filters).toBe("object");
    expect(Object.keys(filters).includes("install")).toBeTruthy();
    expect(Object.keys(filters).length).toBe(1);
  });
})

describe("app.use(filtersPlugin) method", () => {
  test("with no filters in app.config or createFilters.config", () => {
    app = createZenithic({ filters: [] });
    expect(app.filters).toStrictEqual({});
  
    app.use(filters);
    expect(app.filters).toStrictEqual({});
  });
  
  test("with no filters in app.config but in createFilters.config", () => {
    app = createZenithic({ filters: [] });
    expect(app.filters).toStrictEqual({});
  
    filters = createFilters(["date", "lowercase"]);
    app.use(filters);
    expect(Object.keys(app.filters).sort().toString()).toBe("date,lowercase");
  });
  
  test("with filters in app.config", () => {
    app = createZenithic();
    expect(Object.keys(app.filters).sort().toString()).toBe(defaultConfig.default.filters.sort().toString());
  });
})

export {};