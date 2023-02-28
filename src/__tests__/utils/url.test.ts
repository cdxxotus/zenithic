const { parse, join } = require("../../utils/url");

test("parse", () => {
  const url = "https://zenithic.js.org/one/two/three";
  const parser = parse(url);

  expect(parser.tagName).toBe("A");
});

test("join", () => {
  const url = "https://zenithic.js.org/one/two/three";
  const array = ["https://zenithic.js.org", "one", "two", "three"];
  expect(join(...array)).toBe(url);
});
