const makeTooltipId = (binding) => {
  return `tooltip-${binding.value}`;
};

const buildTooltip = (el) => {
  const tooltipText = el.dataset.tooltipText;
  tooltipEl.textContent = tooltipText;
  document.body.appendChild(tooltipEl);
  const rect = el.getBoundingClientRect();
  const tooltipRect = tooltipEl.getBoundingClientRect();
  tooltipEl.style.top = `${rect.top - tooltipRect.height}px`;
  tooltipEl.style.left = `${
    rect.left + rect.width / 2 - tooltipRect.width / 2
  }px`;
};

const handleMouseEnter = (el, binding) => {
  const tooltipEl = document.createElement("div");
  tooltipEl.id = makeTooltipId(binding);
  buildTooltip(el);
};

const handleMouseLeave = (binding) => {
  const tooltipEl = document.querySelector(`#${makeTooltipId(binding)}`);
  if (tooltipEl) {
    tooltipEl.remove();
  }
};

export default {
  mounted(el, binding) {
    el.addEventListener("mouseenter", () => handleMouseEnter(el, binding));
    el.addEventListener("mouseleave", () => handleMouseLeave(binding));
  },

  updated(el, binding) {
    buildTooltip(binding);
  },

  beforeDestroy(el, binding) {
    el.removeEventListener(() => handleMouseEnter(el, binding));
    el.removeEventListener(() => handleMouseLeave(binding));
  },
};
