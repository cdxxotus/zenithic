export default (value, currencyCode) => {
  let formatter = new Intl.NumberFormat(null, {
    style: "currency",
    currency: currencyCode,
  });

  return formatter.format(value);
};
