export type State = any;

export type Action = (...[]) => Promise<unknown>;

export type Mutation = (...[]) => void;

export type Getter = (getterName: string) => unknown;

export type Actions = Record<string, Action>;

export type Getters = Record<string, Getter>;

export type Mutations = Record<string, Mutation>;

export type Modules = Record<string, Module>;

export type StoreConfig = {
  initialState: State;
  actions: Actions;
  mutations: Mutations;
  modules: Modules;
  getters: Getters;
};

export type Module = Omit<StoreConfig, "modules">;

export type Store = Omit<StoreConfig, 'initialState'> & {
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
