export const createGetters = (config) => {
  const { getters = {}, modules = {} } = config;
  const allGetters = {};

  Object.keys(modules).forEach((moduleName) => {
    const module = modules[moduleName];
    const { getters = {} } = module;

    Object.keys(getters).forEach((getterName) => {
      const getterFullName = `${moduleName}/${gettersName}`;
      allGetters[getterFullName] = getters[gettersName];
    });
  });

  Object.keys(getters).forEach((getterName) => {
    allGetters[getterName] = getters[getterName];
  });

  return allGetters;
}
