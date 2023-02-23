export default (array, sortKey, reverse = false) => {
  if (!Array.isArray(array)) {
    return array;
  }

  const order = reverse ? -1 : 1;

  array.sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal < bVal) {
      return -1 * order;
    } else if (aVal > bVal) {
      return 1 * order;
    }

    return 0;
  });

  return array;
};
