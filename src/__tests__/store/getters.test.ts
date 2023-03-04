import { createGetters } from "../../store/getters";
import { Getters, StoreConfig, Modules } from "../../types/store";

describe("createGetters function", () => {
  test("should return an object containing all the getters of the store", () => {
    const initialState = {
      firstName: "John",
      lastName: "Doe",
    };

    const getters: Getters = {
      firstName: (state) => state.firstName,
      lastName: (state) => state.lastName,
    };

    const modules: Modules = {
      user: {
        initialState: {
          firstName: "John",
          lastName: "Smith",
        },
        getters: {
          fullName: (state) => `${state.user.firstName} ${state.user.lastName}`,
        },
      },
    };

    const config: StoreConfig = {
      initialState,
      getters,
      modules,
    };

    const allGetters = createGetters(config);

    expect(allGetters.firstName(initialState)).toBe("John");
    expect(allGetters.lastName(initialState)).toBe("Doe");
    expect(
      allGetters["user/fullName"]({
        user: { firstName: "John", lastName: "Smith" },
      })
    ).toBe("John Smith");
  });

  test("should return an object with only the getters if no modules are defined", () => {
    const initialState = {
      firstName: "John",
      lastName: "Doe",
    };

    const getters: Getters = {
      firstName: (state) => state.firstName,
      lastName: (state) => state.lastName,
    };

    const config: StoreConfig = {
      initialState,
      getters,
    };

    const allGetters = createGetters(config);

    expect(allGetters.firstName(initialState)).toBe("John");
    expect(allGetters.lastName(initialState)).toBe("Doe");
    expect(allGetters["user/fullName"]).toBeUndefined();
  });

  test("should return an empty object if no getters are defined", () => {
    const config: StoreConfig = {};
    const allGetters = createGetters(config);
    expect(allGetters).toEqual({});
  });
});
