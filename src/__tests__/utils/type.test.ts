import { isObject, isFunction, isArray, isString, isNumber } from '../../utils/type';

describe('isObject function', () => {
  test('should return true for an object', () => {
    expect(isObject({})).toBe(true);
  });

  test('should return false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  test('should return false for non-object types', () => {
    expect(isObject(42)).toBe(false);
    expect(isObject('string')).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});

describe('isFunction function', () => {
    test('should return true for a function', () => {
      expect(isFunction(() => {})).toBe(true);
    });
  
    test('should return false for non-function types', () => {
      expect(isFunction({})).toBe(false);
      expect(isFunction([])).toBe(false);
      expect(isFunction('string')).toBe(false);
      expect(isFunction(42)).toBe(false);
      expect(isFunction(undefined)).toBe(false);
    });
  });
  
  describe('isArray function', () => {
    test('should return true for an array', () => {
      expect(isArray([])).toBe(true);
    });
  
    test('should return false for non-array types', () => {
      expect(isArray({})).toBe(false);
      expect(isArray('string')).toBe(false);
      expect(isArray(42)).toBe(false);
      expect(isArray(undefined)).toBe(false);
    });
  });
  
  describe('isString function', () => {
    test('should return true for a string', () => {
      expect(isString('')).toBe(true);
    });
  
    test('should return false for non-string types', () => {
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString(42)).toBe(false);
      expect(isString(undefined)).toBe(false);
    });
  });
  
  describe('isNumber function', () => {
    test('should return true for a number', () => {
      expect(isNumber(42)).toBe(true);
    });
  
    test('should return false for non-number types', () => {
      expect(isNumber({})).toBe(false);
      expect(isNumber([])).toBe(false);
      expect(isNumber('string')).toBe(false);
      expect(isNumber(undefined)).toBe(false);
    });
  });