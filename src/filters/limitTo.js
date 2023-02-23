export default (input, limit) => {
  if (!input || !input.length) return "";
  if (!limit || limit >= input.length) return input;
  return input.slice(0, limit);
};
