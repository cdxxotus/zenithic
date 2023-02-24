export const parse = (url) => {
  const parser = document.createElement("a");
  parser.href = url;
  return parser;
}

export const join = (...args) => {
  return args.join("/");
}
