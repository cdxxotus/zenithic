export function createState(config) {
  const { initialState = {}, modules = {} } = config;
  const allState = {};

  Object.keys(modules).forEach((moduleName) => {
    const module = modules[moduleName];
    const { state = {} } = module;
    allState[moduleName] = state;
  });

  Object.keys(initialState).forEach((stateName) => {
    allState[stateName] = initialState[stateName];
  });

  return allState;
}
