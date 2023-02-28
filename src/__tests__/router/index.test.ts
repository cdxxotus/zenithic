const { createZenithic } = require('"../../../src');
const { createRouter } = require("../../router");
const defaultConfig = require("../../config");
const Button = require("../../components/Button");

let app;
let router;

const routerProperties = "listen,navigateTo,registerHistory,registerRoutes";

beforeAll(() => {
  router = createRouter();
});

beforeEach(() => {
  app = null;
});

test("createRouter", () => {
  expect(typeof router).toBe("object");
  expect(Object.keys(router).includes("install")).toBeTruthy();
  expect(Object.keys(router).length).toBe(1);
});

test("app.use(router) with no router in app.config or createRouter.config", () => {
  app = createZenithic({ router: false });
  expect(app.router).toBeNull();

  app.use(router);
  expect(Object.keys(app.router).sort().toString()).toBe(routerProperties);
});

test("app.use(router) with no router in app.config but in createRouter.config", () => {
  app = createZenithic({ router: false });
  expect(app.router).toBeNull();

  router = createRouter({ routes: [{ path: '/', component: Button }] });
  app.use(router);
  expect(Object.keys(app.router).sort().toString()).toBe(routerProperties);
});

test("app.use(router) with router in app.config", () => {
  app = createZenithic();
  expect(Object.keys(app.router).sort().toString()).toBe(routerProperties);
});
