export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

export function isFunction(fn) {
    return typeof fn === 'function'
}

export function isArray(arr) {
    return Array.isArray(arr)
}

export function isString(str) {
    return typeof str === 'string'
}

export function isNumber(num) {
    return typeof num === 'number'
}