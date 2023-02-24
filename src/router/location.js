export const createLocation = (location) => {
  const { pathname, search, hash } = location;

  return {
    pathname,
    search,
    hash,
  };
};
