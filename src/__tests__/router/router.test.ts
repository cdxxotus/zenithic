import { prepareRouter } from "../../router/router";
import { createHistory } from "../../router/history";

describe("prepareRouter function", () => {
  // Mock the window object
  const windowSpy = jest.spyOn(global, "window", "get");
  const history = {
    pushState: jest.fn(),
    replaceState: jest.fn(),
  };
  windowSpy.mockImplementation(() => ({
    // @ts-ignore
    history,
    addEventListener: () => {}
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return a Router object with registerHistory, registerRoutes, navigateTo, and listen methods", () => {
    const router = prepareRouter();
    expect(router).toHaveProperty("registerHistory");
    expect(router).toHaveProperty("registerRoutes");
    expect(router).toHaveProperty("navigateTo");
    expect(router).toHaveProperty("listen");
  });

  test("should call the registerHistory method with a history object", () => {
    const router = prepareRouter();
    const historyObject = createHistory();
    router.registerHistory(historyObject);
    expect(router.getHistory()).toBe(historyObject);
  });

  test("should call the registerRoutes method with an array of routes", () => {
    const router = prepareRouter();
    const routes = [{ path: "/test", component: { template: "" } }];
    router.registerRoutes(routes);
    expect(router.getRoutes()).toEqual(routes);
  });

  test("should call the navigateTo method with a pathname", () => {
    const router = prepareRouter();
    const historyObject = createHistory();
    router.registerHistory(historyObject);
    const pathname = "/test";
    router.navigateTo(pathname);
    expect(history.pushState).toHaveBeenCalledWith(null, "", pathname);
  });

  test("should call the listen method with a callback function", () => {
    const router = prepareRouter();
    const historyObject = createHistory();
    historyObject.listen = jest.fn();
    router.registerHistory(historyObject);
    const callback = jest.fn();
    router.listen(callback);
    expect(historyObject.listen).toHaveBeenCalled();
  });
});
