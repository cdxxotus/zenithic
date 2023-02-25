export const isObject = (obj: unknown) => {
  return obj !== null && typeof obj === "object";
}

export const isFunction = (fn: unknown) => {
  return typeof fn === "function";
}

export const isArray = (arr: unknown) => {
  return Array.isArray(arr);
}

export const isString = (str: unknown) => {
  return typeof str === "string";
}

export const isNumber = (num: unknown) => {
  return typeof num === "number";
}
