const handleMouseEnter = () => {
  const tooltipText = this.data.tooltipText;
  const tooltipEl = document.createElement("div");
  tooltipEl.className = "tooltip";
  tooltipEl.textContent = tooltipText;
  document.body.appendChild(tooltipEl);
  const rect = this.el.getBoundingClientRect();
  const tooltipRect = tooltipEl.getBoundingClientRect();
  tooltipEl.style.top = `${rect.top - tooltipRect.height}px`;
  tooltipEl.style.left = `${
    rect.left + rect.width / 2 - tooltipRect.width / 2
  }px`;
};

const handleMouseLeave = () => {
  const tooltipEl = document.querySelector(".tooltip");
  if (tooltipEl) {
    tooltipEl.remove();
  }
};

export default {
  mounted() {
    this.el.addEventListener("mouseenter", handleMouseEnter.bind(this));
    this.el.addEventListener("mouseleave", handleMouseLeave);
  },
  beforeDestroy() {
    this.el.removeEventListener(handleMouseEnter);
    this.el.removeEventListener(handleMouseLeave);
  },
};
