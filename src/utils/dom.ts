const isInput = (el: Element) => {
  return el.tagName === "INPUT";
}

const isSelect = (el: Element) => {
  return el.tagName === "SELECT";
}

const set = (el: Element, value: string) => {
  if (isInput(el) || isSelect(el)) {
    (el as HTMLInputElement).value = value;
  } else {
    el.textContent = value;
  }
}

const querySelector = (selector: string) => {
  return document.querySelector(selector);
}

const querySelectorAll = (selector: string) => {
  return document.querySelectorAll(selector);
}

const getComputedStyle = (element: Element) => {
  return window.getComputedStyle(element);
}

export default {
  querySelector,
  querySelectorAll,
  getComputedStyle,
  isInput,
  isSelect,
  set,
}