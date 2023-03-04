import { format } from "../../utils/number";

describe("format function", () => {
  test("should format a positive integer to the correct number of decimal places", () => {
    expect(format(1234, 2)).toBe("1234.00");
    expect(format(1234, 3)).toBe("1234.000");
    expect(format(1234, 0)).toBe("1234");
  });

  test("should format a negative number to the correct number of decimal places", () => {
    expect(format(-12.345, 2)).toBe("-12.35");
    expect(format(-12.345, 3)).toBe("-12.345");
    expect(format(-12.345, 0)).toBe("-12");
  });

  test("should format a floating point number to the correct number of decimal places", () => {
    expect(format(3.14159, 2)).toBe("3.14");
    expect(format(3.14159, 4)).toBe("3.1416");
    expect(format(3.14159, 0)).toBe("3");
  });

  test("should return NaN for invalid inputs", () => {
    expect(format(NaN, 2)).toBe("NaN");
    expect(format(undefined, 2)).toBe("NaN");
    expect(format(null, 2)).toBe("NaN");
  });
});
