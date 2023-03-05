import { parse, join } from "../../utils/url";

describe("parse function", () => {
  test("should return a `A` node", () => {
    const url = "https://zenithic.js.org/one/two/three";
    const parser = parse(url);

    expect(parser.tagName).toBe("A");
  });
});
describe("join function", () => {
  test("should return a tring", () => {
    const url = "https://zenithic.js.org/one/two/three";
    const array = ["https://zenithic.js.org", "one", "two", "three"];
    expect(join(...array)).toBe(url);
  });
});

export {};
