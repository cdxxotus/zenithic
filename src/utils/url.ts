export const parse = (url: string) => {
  const parser = document.createElement("a");
  parser.href = url;
  return parser;
}

export const join = (...args: string[]) => {
  return args.join("/");
}
