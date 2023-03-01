import {
  Directive,
  TooltipDirective,
} from "../types/directives/types";
import { CompiledComponent } from "../types/components";

/**
 * Builds a tooltip element and returns it
 * @param {HTMLElement} el - The element that the tooltip is attached to
 * @param {string} tooltipText - The text content of the tooltip
 * @returns {HTMLElement} - The tooltip element
 */
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

/**
 * Shows the tooltip when the mouse enters the element
 */
const handleMouseEnter = () => {
  document.body.appendChild((this as CompiledComponent).tooltipElement);
  (this as CompiledComponent).tooltipNode = document.body.lastChild;
};

/**
 * Hides the tooltip when the mouse leaves the element
 */
const handleMouseLeave = () => {
  (this as CompiledComponent).tooltipNode.remove();
};

/**
 * A directive that attach a tooltip that shows the directive value to an Element 
 * @type {TooltipDirective}
 */
const tooltip: TooltipDirective = {
  parseValue(str: string) {
    return String(this[str] || str);
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
    if (this.tooltipNode) this.tooltipNode.remove();
  },
};

export default tooltip satisfies Directive;
