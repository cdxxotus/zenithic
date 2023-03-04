import { createHistory } from "../../router/history";

describe("createHistory", () => {
  // Mock the window object
  const windowSpy = jest.spyOn(global, "window", "get");
  const history = {
    pushState: jest.fn(),
    replaceState: jest.fn(),
  };

  windowSpy.mockImplementation(() => ({
    // @ts-ignore
    history,
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return an object with listen, push and replace methods", () => {
    const historyObject = createHistory();

    expect(historyObject).toHaveProperty("listen");
    expect(historyObject).toHaveProperty("push");
    expect(historyObject).toHaveProperty("replace");
  });

  test("should call pushState method with pathname when push method is called", () => {
    const historyObject = createHistory();
    const pathname = "/test";
    historyObject.push(pathname);

    expect(history.pushState).toHaveBeenCalledWith(null, "", pathname);
  });

  test("should call replaceState method with pathname when replace method is called", () => {
    const historyObject = createHistory();
    const pathname = "/test";
    historyObject.replace(pathname);

    expect(history.replaceState).toHaveBeenCalledWith(null, "", pathname);
  });
});
