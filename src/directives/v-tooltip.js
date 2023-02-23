const buildTooltip = (el) => {
  tooltipEl.id = `tooltip-${binding.value}`;
  tooltipEl.textContent = tooltipText;
  document.body.appendChild(tooltipEl);
  const rect = el.getBoundingClientRect();
  const tooltipRect = tooltipEl.getBoundingClientRect();
  tooltipEl.style.top = `${rect.top - tooltipRect.height}px`;
  tooltipEl.style.left = `${
    rect.left + rect.width / 2 - tooltipRect.width / 2
  }px`;
};

const handleMouseEnter = () => {
  const tooltipText = el.dataset.tooltipText;
  const tooltipEl = document.createElement("div");
  buildTooltip(el);
};

const handleMouseLeave = () => {
  const tooltipEl = document.querySelector(".tooltip");
  if (tooltipEl) {
    tooltipEl.remove();
  }
};

export default {
  mounted(el, binding) {
    el.addEventListener("mouseenter", () => handleMouseEnter(binding));
    el.addEventListener("mouseleave", () => handleMouseLeave(binding));
  },

  updated(el, binding) {
    const tooltipEl = document.querySelector(`tooltip-${binding.value}`);
    tooltip.updated.call({ el });
  },

  beforeDestroy(el, binding) {
    el.removeEventListener(() => handleMouseEnter(binding));
    el.removeEventListener(() => handleMouseLeave(binding));
  },
};
