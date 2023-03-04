import { createState } from "../../store/state";
import { StoreConfig } from "../../types/store";

describe("createState function", () => {
  test("should a state object with the correct initial state", () => {
    const initialState = { foo: "bar" };
    const config: StoreConfig = {
      initialState,
      modules: {},
    };

    const state = createState(config);

    expect(state).toEqual(initialState);
  });

  test("should combine the initial state with the module initial states", () => {
    const moduleInitialState = { counter: 0 };
    const modules = { counter: { initialState: moduleInitialState } };
    const initialState = { foo: "bar" };
    const config: StoreConfig = {
      initialState,
      modules,
    };

    const state = createState(config);

    expect(state).toEqual({
      ...initialState,
      counter: moduleInitialState,
    });
  });

  test("should overide module initial states with the initial state object", () => {
    const moduleInitialState = { counter: 0 };
    const modules = { counter: { initialState: moduleInitialState } };
    const initialState = { counter: { value: 10 } };
    const config: StoreConfig = {
      initialState,
      modules,
    };

    const state = createState(config);

    expect(state).toEqual(initialState);
  });

  test("should an empty state object if no initial state or modules are provided", () => {
    const state = createState();

    expect(state).toEqual({});
  });
});
