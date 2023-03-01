/**
 * Checks if the element is an input element.
 * @param {Element} element The element to check.
 * @returns {boolean}
 */
export const isInput = (element: Element) => element.tagName === "INPUT";

/**
 * Checks if the element is a select element.
 * @param {Element} element The element to check.
 * @returns {boolean}
 */
export const isSelect = (element: Element) => element.tagName === "SELECT";

/**
 * Sets the value of an element.
 * @param {Element} element The element to set the value for.
 * @param {string} value The value to set.
 */
export const set = (element: Element, value: string) => {
  if (isInput(element) || isSelect(element)) {
    (element as HTMLInputElement).value = value;
  } else {
    element.textContent = value;
  }
};

/**
 * Queries the document for the first element that matches the selector.
 * @param {string} selector The selector to query.
 * @returns {Element}
 */
export const querySelector = (selector: string) =>
  document.querySelector(selector);

/**
 * Queries the document for all elements that match the selector.
 * @param {string} selector The selector to query.
 * @returns {NodeListOf<Element>}
 */
export const querySelectorAll = (selector: string) =>
  document.querySelectorAll(selector);

/**
 * Gets the computed style for an element.
 * @param {Element} element The element to get the computed style for.
 * @returns {CSSStyleDeclaration}
 */
export const getComputedStyle = (element: Element) =>
  window.getComputedStyle(element);
