import {
  isInput,
  isSelect,
  set,
  querySelector,
  querySelectorAll,
  getComputedStyle,
  makeElementFromString,
} from "../../utils/dom";

beforeEach(() => {
  window.document.getElementsByTagName("body")[0].innerHTML = "";
});

describe("isInput function", () => {
  it("should return true for input element", () => {
    const input = document.createElement("input");
    expect(isInput(input)).toBe(true);
  });

  it("should return false for non-input element", () => {
    const div = document.createElement("div");
    expect(isInput(div)).toBe(false);
  });
});

describe("isSelect function", () => {
  it("should return true for select element", () => {
    const select = document.createElement("select");
    expect(isSelect(select)).toBe(true);
  });

  it("should return false for non-select element", () => {
    const div = document.createElement("div");
    expect(isSelect(div)).toBe(false);
  });
});

describe("set function", () => {
  it("should set input element value", () => {
    const input = document.createElement("input");
    set(input, "foo");
    expect(input.value).toBe("foo");
  });

  it("should set select element value", () => {
    const select = document.createElement("select");
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = "1";
    option2.value = "2";
    select.appendChild(option1);
    select.appendChild(option2);
    set(select, "2");
    expect(select.value).toBe("2");
  });

  it("should set non-input/select element textContent", () => {
    const div = document.createElement("div");
    set(div, "foo");
    expect(div.textContent).toBe("foo");
  });
});

describe("querySelector function", () => {
  it("should return the first matching element", () => {
    const container = document.createElement("div");
    const child1 = document.createElement("span");
    const child2 = document.createElement("span");
    container.appendChild(child1);
    container.appendChild(child2);
    window.document.getElementsByTagName("body")[0].appendChild(container);
    const result = querySelector("span");
    expect(result).toBe(child1);
  });

  it("should return null if no matching element", () => {
    const result = querySelector("non-existent");
    expect(result).toBeNull();
  });
});

describe("querySelectorAll function", () => {
  it("should return all matching elements", () => {
    const container = document.createElement("div");
    const child1 = document.createElement("span");
    const child2 = document.createElement("span");
    container.appendChild(child1);
    container.appendChild(child2);
    window.document.getElementsByTagName("body")[0].appendChild(container);
    const result = querySelectorAll("span");
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(child1);
    expect(result[1]).toBe(child2);
  });

  it("should return empty NodeList if no matching element", () => {
    const result = querySelectorAll("non-existent");
    expect(result).toHaveLength(0);
  });
});

describe("getComputedStyle function", () => {
  it("should return the computed style for an element", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const style = getComputedStyle(div);
    expect(style.display).toBe("block");
    document.body.removeChild(div);
  });
});

describe("makeElementFromString function", () => {
  it("should create an element from a string", () => {
    const str = '<div class="foo">bar</div>';
    const div = makeElementFromString(str);
    expect(div.tagName).toBe("DIV");
    expect(div.className).toBe("foo");
    expect(div.textContent).toBe("bar");
  });
});
