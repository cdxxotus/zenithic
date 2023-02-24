export const isObject = (obj) => {
  return obj !== null && typeof obj === "object";
}

export const isFunction = (fn) => {
  return typeof fn === "function";
}

export const isArray = (arr) => {
  return Array.isArray(arr);
}

export const isString = (str) => {
  return typeof str === "string";
}

export const isNumber = (num) => {
  return typeof num === "number";
}
