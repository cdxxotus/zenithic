const isInput = (el) => {
  return el.tagName === "INPUT";
}

const isSelect = (el) => {
  return el.tagName === "SELECT";
}

const set = (el, value) => {
  if (isInput(elem) || isSelect(elem)) {
    el.value = value;
  } else {
    elem.textContent = value;
  }
}

const querySelector = (selector) => {
  return document.querySelector(selector);
}

const querySelectorAll = (selector) => {
  return document.querySelectorAll(selector);
}

const getComputedStyle = (element) => {
  return window.getComputedStyle(element);
}

export default {
  querySelector,
  querySelectorAll,
  getComputedStyle,
  isInput,
  set,
}