/**
 * Formats a number to a given number of decimal places.
 *
 * @param {number} number - The number to format.
 * @param {number} decimalPlaces - The number of decimal places to format the number to.
 * @returns {string} A string representation of the number, formatted to the given number of decimal places.
 */
export const format = (number: number, decimalPlaces: number) => {
  let fixed = decimalPlaces;
  fixed = Math.min(20, fixed);
  fixed = Math.max(0, fixed);
  return number.toFixed(fixed);
}
