/**
 * This function is a safe way to parse a URL. It will throw an error if the
 * URL is malformed.
 *
 * @param url The URL to parse.
 */
export const parse = (url: string) => {
  const parser = document.createElement("a");
  parser.href = url;
  return parser;
}

/**
 * This function will join path segments together. It will ensure that there
 * are no double slashes.
 *
 * @param paths The path segments to join.
 */
export const join = (...paths: string[]) => {
  return paths.filter(a => a).join("/");
}
