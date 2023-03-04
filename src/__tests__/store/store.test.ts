import { prepareStore, buildStore } from "../../store/store";
import { Store, StoreConfig } from "../../types/store";

describe("prepareStore function", () => {
  test("should create a store object with the correct interface", () => {
    const store = prepareStore();

    expect(store.actions).toBeDefined();
    expect(store.getters).toBeDefined();
    expect(store.mutations).toBeDefined();
    expect(store.state).toBeDefined();
    expect(store.registerActions).toBeDefined();
    expect(store.registerGetters).toBeDefined();
    expect(store.registerMutations).toBeDefined();
    expect(store.registerModule).toBeDefined();
    expect(store.registerState).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.commit).toBeDefined();
  });

  test("should register actions to the store object", () => {
    const actions = { foo: () => new Promise(() => {}) };
    const store = prepareStore();

    store.registerActions(actions);

    expect(store.actions).toEqual(actions);
  });

  test("should register getters to the store object", () => {
    const getters = { foo: () => "bar" };
    const store = prepareStore();

    store.registerGetters(getters);

    expect(store.getters).toEqual(getters);
  });

  test("should register mutations to the store object", () => {
    const mutations = { foo: (state) => {} };
    const store = prepareStore();

    store.registerMutations(mutations);

    expect(store.mutations).toEqual(mutations);
  });

  test("should register state to the store object", () => {
    const state = { foo: "bar" };
    const store = prepareStore();

    store.registerState(state);

    expect(store.state).toEqual(state);
  });

  test("should register a module to the store object", () => {
    const module = {
      initialState: { count: 0 },
      getters: { getCount: (state: any) => state.count },
      mutations: { increment: (state: any) => state.count++ },
      actions: { asyncIncrement: ({ commit }: any) => commit("increment") },
    };
    const store = prepareStore();

    store.registerModule("counter", module);

    expect(store.actions).toHaveProperty("counter/asyncIncrement");
    expect(store.getters).toHaveProperty("counter/getCount");
    expect(store.mutations).toHaveProperty("counter/increment");
    expect(store.state).toHaveProperty("counter");
    expect(store.state.counter).toHaveProperty("count");
    expect(store.state.counter.count).toBe(0);
  });

  test("should dispatche an action to the store object", async () => {
    const actionName = "foo";
    const action = jest.fn();
    const store = prepareStore();
    console.log({store})
    store.registerActions({ [actionName]: action });

    await store.dispatch(actionName);

    expect(action).toHaveBeenCalled();
  });

  it("should throw an error if dispatching a non-existing action", async () => {
    const actionName = "foo";
    const store = prepareStore();

    await expect(store.dispatch(actionName)).rejects.toThrow("Action not found");
  });

  test("should commit a mutation to the store object", () => {
    const mutationName = "foo";
    const mutation = jest.fn();
    const store = prepareStore();
    store.registerMutations({ [mutationName]: mutation });

    store.commit(mutationName);

    expect(mutation).toHaveBeenCalled();
  });

  test("should throw an error if committing a non-existing mutation", () => {
    const mutationName = "foo";
    const store = prepareStore();

    expect(() => store.commit(mutationName)).toThrow("Mutation not found");
  });
});

describe("buildStore function", () => {
    it("should return a store with empty objects if no configuration is provided", () => {
      const store = buildStore();
      expect(store.actions).toEqual({});
      expect(store.getters).toEqual({});
      expect(store.mutations).toEqual({});
      expect(store.state).toEqual({});
    });
  
    it("should register actions, getters, mutations, and state if provided in configuration", () => {
      const config = {
        actions: {
          increment: jest.fn(),
          decrement: jest.fn(),
        },
        getters: {
          count: jest.fn(),
        },
        mutations: {
          setCount: jest.fn(),
        },
        initialState: {
          count: 0,
        },
      };
      const store = buildStore(config);
  
      expect(store.actions).toEqual(config.actions);
      expect(store.getters).toEqual(config.getters);
      expect(store.mutations).toEqual(config.mutations);
      expect(store.state).toEqual(config.initialState);
    });
  
    it("should throw an error when an action is dispatched that doesn't exist", async () => {
      const store = buildStore();
      await expect(store.dispatch("nonexistentAction")).rejects.toThrow("Action not found");
    });
  
    it("should throw an error when a mutation is committed that doesn't exist", () => {
      const store = buildStore();
      expect(() => store.commit("nonexistentMutation")).toThrow("Mutation not found");
    });
  });
  