export function parse(url) {
  const parser = document.createElement("a");
  parser.href = url;
  return parser;
}

export function join(...args) {
  return args.join("/");
}
