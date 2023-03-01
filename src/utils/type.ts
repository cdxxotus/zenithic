/**
 * Returns true if the given value is an object and not null.
 *
 * @param obj The value to check.
 * @returns true if the value is an object and not null.
 */
export const isObject = (obj: unknown): obj is object =>
  typeof obj === "object" && obj !== null;

/**
 * Returns true if the given value is a function.
 *
 * @param fn The value to check.
 * @returns true if the value is a function.
 */
export const isFunction = (fn: unknown): fn is Function =>
  typeof fn === "function";

/**
 * Returns true if the given value is an array.
 *
 * @param arr The value to check.
 * @returns true if the value is an array.
 */
export const isArray = <T = any>(arr: unknown): arr is T[] =>
  Array.isArray(arr);

/**
 * Returns true if the given value is a string.
 *
 * @param str The value to check.
 * @returns true if the value is a string.
 */
export const isString = (str: unknown): str is string =>
  typeof str === "string";

/**
 * Returns true if the given value is a number.
 *
 * @param num The value to check.
 * @returns true if the value is a number.
 */
export const isNumber = (num: unknown): num is number =>
  typeof num === "number";