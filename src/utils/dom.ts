export const isInput = (el: Element) => {
  return el.tagName === "INPUT";
};

export const isSelect = (el: Element) => {
  return el.tagName === "SELECT";
};

export const set = (el: Element, value: string) => {
  if (isInput(el) || isSelect(el)) {
    (el as HTMLInputElement).value = value;
  } else {
    el.textContent = value;
  }
};

export const querySelector = (selector: string) => {
  return document.querySelector(selector);
};

export const querySelectorAll = (selector: string) => {
  return document.querySelectorAll(selector);
};

export const getComputedStyle = (element: Element) => {
  return window.getComputedStyle(element);
};