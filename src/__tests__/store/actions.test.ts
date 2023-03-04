import { createActions } from "../../store/actions";

describe("createActions function", () => {
  test("should merge actions from the store configuration into one object", () => {
    const config = {
      actions: {
        increment: () => new Promise(() => {}),
        decrement: () => new Promise(() => {}),
      },
      modules: {
        cart: {
          actions: {
            addItem:() => new Promise(() => {}),
            removeItem: () => new Promise(() => {}),
          },
        },
        user: {
          actions: {
            login: () => new Promise(() => {}),
            logout: () => new Promise(() => {}),
          },
        },
      },
    };

    const allActions = createActions(config);

    expect(allActions).toEqual({
      increment: config.actions.increment,
      decrement: config.actions.decrement,
      "cart/addItem": config.modules.cart.actions.addItem,
      "cart/removeItem": config.modules.cart.actions.removeItem,
      "user/login": config.modules.user.actions.login,
      "user/logout": config.modules.user.actions.logout,
    });
  });

  test("should return an empty object if no config is provided", () => {
    const allActions = createActions();

    expect(allActions).toEqual({});
  });

  test("should return only actions if no modules are provided in the config", () => {
    const config = {
      actions: {
        increment: () => new Promise(() => {}),
        decrement: () => new Promise(() => {}),
      },
    };

    const allActions = createActions(config);

    expect(allActions).toEqual({
      increment: config.actions.increment,
      decrement: config.actions.decrement,
    });
  });

  test("should return only module actions if no top-level actions are provided in the config", () => {
    const config = {
      modules: {
        cart: {
          actions: {
            addItem: () => new Promise(() => {}),
            removeItem: () => new Promise(() => {}),
          },
        },
        user: {
          actions: {
            login: () => new Promise(() => {}),
            logout: () => new Promise(() => {}),
          },
        },
      },
    };

    const allActions = createActions(config);

    expect(allActions).toEqual({
      "cart/addItem": config.modules.cart.actions.addItem,
      "cart/removeItem": config.modules.cart.actions.removeItem,
      "user/login": config.modules.user.actions.login,
      "user/logout": config.modules.user.actions.logout,
    });
  });
});
