import {
  Directive,
  TooltipDirective,
} from "../types/directives/types";
import { CompiledComponent } from "../types/components";

const buildTooltip = (el: HTMLElement, tooltipText: string) => {
  const tooltipEl = document.createElement("div");
  tooltipEl.textContent = tooltipText || "";
  const rect = el.getBoundingClientRect();
  const tooltipRect = tooltipEl.getBoundingClientRect();
  tooltipEl.style.top = `${rect.top - tooltipRect.height}px`;
  tooltipEl.style.left = `${
    rect.left + rect.width / 2 - tooltipRect.width / 2
  }px`;

  return tooltipEl;
};

const handleMouseEnter = () => {
  document.body.appendChild((this as CompiledComponent).tooltipElement);
  (this as CompiledComponent).tooltipNode = document.body.lastChild;
};

const handleMouseLeave = () => {
  (this as CompiledComponent).tooltipNode.remove();
};

const tooltip: TooltipDirective = {
  parseValue(str: string) {
    return this[str].toString();
  },

  beforeMount(el, binding) {
    const component = this;
    component.tooltipElement = buildTooltip(el, binding.value);
    el.addEventListener("mouseenter", handleMouseEnter.bind(component));
    el.addEventListener("mouseleave", handleMouseLeave.bind(component));
  },

  updated(el, binding) {
    const component = this;
    component.tooltipElement = buildTooltip(el, binding.value);
    if (this.tooltipNode) {
      this.tooltipNode.remove();
      document.body.appendChild(this.tooltipElement);
      this.tooltipNode = document.body.lastChild;
    }
  },

  beforeDestroy(el, _binding) {
    const component = this;
    el.removeEventListener("mouseenter", handleMouseEnter.bind(component));
    el.removeEventListener("mouseleave", handleMouseLeave.bind(component));
  },
};

export default tooltip satisfies Directive;
