import { querySelector } from "../utils/dom";

import { Binding, Directive, TooltipDirective } from "../types/directives/types";

const makeTooltipId = (binding: Binding) => {
  return `tooltip-${binding.value}`;
};

const buildTooltip = (el: HTMLElement, tooltipEl: HTMLDivElement) => {
  const tooltipText = el.dataset.tooltipText;
  tooltipEl.textContent = tooltipText || "";
  const rect = el.getBoundingClientRect();
  const tooltipRect = tooltipEl.getBoundingClientRect();
  tooltipEl.style.top = `${rect.top - tooltipRect.height}px`;
  tooltipEl.style.left = `${
    rect.left + rect.width / 2 - tooltipRect.width / 2
  }px`;
};

const handleMouseEnter = (el: HTMLElement, binding: Binding) => {
  const tooltipEl = document.createElement("div");
  tooltipEl.id = makeTooltipId(binding);
  buildTooltip(el, tooltipEl);
  document.body.appendChild(tooltipEl);
};

const handleMouseLeave = (binding: Binding) => {
  const tooltipEl = document.querySelector(`#${makeTooltipId(binding)}`);
  if (tooltipEl) {
    tooltipEl.remove();
  }
};


const tooltip: TooltipDirective = {
  beforeMount(el, binding) {
    el.addEventListener("mouseenter", () => handleMouseEnter(el, binding));
    el.addEventListener("mouseleave", () => handleMouseLeave(binding));
  },

  updated(el, binding) {
    const tooltipEl = querySelector(`#${makeTooltipId(binding)}`) as HTMLDivElement;
    buildTooltip(el, tooltipEl);
  },

  beforeDestroy(el, binding) {
    el.removeEventListener("mouseenter", () => handleMouseEnter(el, binding));
    el.removeEventListener("mouseleave", () => handleMouseLeave(binding));
  },
};

export default tooltip satisfies Directive;