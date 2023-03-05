import { createZenithic } from "../../../src";
import { createStore } from "../../store";

let app;
let store;

const storeProperties = "actions,commit,dispatch,getters,mutations,registerActions,registerGetters,registerModule,registerMutations,registerState,state";

beforeAll(() => {
  store = createStore();
});

beforeEach(() => {
  app = null;
});

describe("createStore function", () => {
  test("should return a Plugin", () => {
    expect(typeof store).toBe("object");
    expect(Object.keys(store).includes("install")).toBeTruthy();
    expect(Object.keys(store).length).toBe(1);
  });
})

describe("app.use(storePlugin) method", () => {
  test("with no store in app.config or createStore.config", () => {
    app = createZenithic({ store: false });
    expect(app.store).toBeNull();
  
    app.use(store);
    expect(Object.keys(app.store).sort().toString()).toBe(storeProperties);
  });
  
  test("with no store in app.config but in createStore.config", () => {
    app = createZenithic({ store: false });
    expect(app.store).toBeNull();
  
    store = createStore({ initialState: { count: 0 } });
    app.use(store);
    expect(Object.keys(app.store).sort().toString()).toBe(storeProperties);
    expect(app.store.state.count).toBe(0);
  });
  
  test("with store in app.config", () => {
    app = createZenithic();
    expect(Object.keys(app.store).sort().toString()).toBe(storeProperties);
  });
})

export {};