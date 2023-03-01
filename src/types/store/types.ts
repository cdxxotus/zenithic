/**
 * The state of a store.
 *
 * @example
 * {
 *   name: 'Abdelrahman Inas',
 *   age: 22,
 *   module1: {
 *     count: 0
 *   }
 * }
 */
export type State = { [key: string]: any };

/**
 * A store module.
 */
export type Module = Omit<StoreConfig, "modules">;

/**
 * An action function.
 *
 * @param params Action parameters.
 * @return A promise to be resolved or rejected, it can be resolved with any value.
 *
 * @example
 * async function updateName (name) {
 *   // do something
 *   return name;
 * }
 */
export type Action = (...params: any[]) => Promise<any>;

/**
 * A mutation function.
 *
 * @param params Mutation parameters.
 */
export type Mutation = (...params: any[]) => void;

/**
 * A getter function.
 *
 * @param getterName The getter name.
 * @return The getter value.
 *
 * @example
 * function name () {
 *   return this.state.name;
 * }
 */
export type Getter = (getterName: string) => any;

/**
 * An object of actions.
 *
 * @example
 * {
 *  updateProfile: async (name) => {
 *    this.state.name = name;
 *    this.state.age = age;
 *    await post('/profile', this.state);
 *    return;
 *  }
 * }
 */
export type Actions = { [key: string]: Action };

/**
 * An object of getters.
 *
 * @example
 * {
 *  name: () => {
 *    return this.state.name;
 *  },
 *  age: () => {
 *    return this.state.age;
 *  }
 * }
 */
export type Getters = { [key: string]: Getter };

/**
 * An object of mutations.
 *
 * @example
 * {
 *  incrementAge: (value) => {
 *    this.state.age += value;
 *  },
 *  incrementCount: (value) => {
 *    this.state.module1.count += value;
 *  }
 * }
 */
export type Mutations = { [key: string]: Mutation };

/**
 * An object of modules.
 *
 * @example
 * {
 *  module1: {
 *    initialState: {
 *      count: 0
 *    },
 *    actions: {
 *      updateProfile: async (name) => {
 *        this.state.name = name;
 *        this.state.age = age;
 *        await post('/profile', this.state);
 *        return;
 *      }
 *    },
 *    mutations: {
 *      incrementCount: (value) => {
 *        this.state.count += value;
 *      }
 *    },
 *    getters: {
 *      count: () => {
 *        return this.state.count;
 *      }
 *    }
 *  }
 * }
 */
export type Modules = { [key: string]: Module };

/**
 * A store config.
 *
 * @example
 * {
 *  initialState: {
 *    name: 'Abdelrahman Inas',
 *    age: 22,
 *    module1: {
 *      count: 0
 *    }
 *  },
 *  actions: {
 *    updateProfile: async (name) => {
 *      this.state.name = name;
 *      this.state.age = age;
 *      await post('/profile', this.state);
 *      return;
 *    },
 *    updateAge: (age) => {
 *      this.state.age = age;
 *    }
 *  },
 *  mutations: {
 *    incrementAge: (value) => {
 *      this.state.age += value;
 *    },
 *    incrementCount: (value) => {
 *      this.state.module1.count += value;
 *    }
 *  },
 *  getters: {
 *    name: () => {
 *      return this.state.name;
 *    },
 *    age: () => {
 *      return this.state.age;
 *    }
 *  },
 *  modules: {
 *    module1: {
 *      initialState: {
 *        count: 0
 *      },
 *      mutations: {
 *        incrementCount: (value) => {
 *          this.state.count += value;
 *        }
 *      },
 *      getters: {
 *        count: () => {
 *          return this.state.count;
 *        }
 *      }
 *    }
 *  }
 * }
 */
export type StoreConfig = {
  initialState: State;
  actions: Actions;
  mutations: Mutations;
  modules: Modules;
  getters: Getters;
};

/**
 * A store.
 */
export type Store = Omit<StoreConfig, "initialState"> & {
  state: State;
  registerActions: (actions: Actions) => void;
  registerGetters: (getters: Getters) => void;
  registerMutations: (mutations: Mutations) => void;
  registerModules: (modules: Modules) => void;
  registerModule: (moduleName: string, module: Module) => void;
  registerState: (state: State) => void;
  dispatch: (actionName: string, ...params: any[]) => Promise<unknown>;
  
  commit: (mutationName: string, ...params: any[]) => void;
};
