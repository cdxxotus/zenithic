import { createRoutes } from "../../router/routes";
import { RouterConfig } from "../../types/router";

describe("createRoutes function", () => {
  test("should return an empty array if no config is provided", () => {
    const routes = createRoutes();
    expect(routes).toEqual([]);
  });

  test("should return the provided routes in the config object", () => {
    const config: RouterConfig = {
      routes: [
        { path: "/", component: { template: '' } },
        { path: "/about", component: { template: '' } },
      ],
    };
    const routes = createRoutes(config);
    expect(routes).toEqual(config.routes);
  });
});
