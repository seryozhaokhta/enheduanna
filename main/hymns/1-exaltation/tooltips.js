class Tooltip {
  constructor(element) {
    this.element = element;
    this.message = element.getAttribute("data-tooltip");
    this.tooltipBox = null;
    this.cursorSymbol = null;
    this.init();
  }

  init() {
    this.element.addEventListener("mouseenter", () => this.showTooltip());
    this.element.addEventListener("mousemove", (e) => this.moveCursorSymbol(e));
    this.element.addEventListener("mouseleave", () => this.hideTooltip());
  }

  createTooltip() {
    this.tooltipBox = document.createElement("div");
    this.tooltipBox.className = "tooltip";
    this.tooltipBox.innerText = this.message;
    document.body.appendChild(this.tooltipBox);
  }

  createCursorSymbol() {
    this.cursorSymbol = document.createElement("div");
    this.cursorSymbol.className = "cursor-symbol";
    document.body.appendChild(this.cursorSymbol);
  }

  animateCursorSymbol(scale) {
    if (this.cursorSymbol) {
      this.cursorSymbol.style.transform = `scale(${scale})`;
      if (scale < 1) {
        requestAnimationFrame(() => this.animateCursorSymbol(scale + 0.068));
      }
    }
  }

  moveCursorSymbol(e) {
    if (this.cursorSymbol) {
      this.cursorSymbol.style.left = e.pageX - 15 + "px";
      this.cursorSymbol.style.top = e.pageY - 15 + "px";
    }
  }

  hideCursorSymbol() {
    if (this.cursorSymbol) {
      document.body.removeChild(this.cursorSymbol);
      this.cursorSymbol = null;
    }
  }

  showTooltip() {
    this.createTooltip();
    this.createCursorSymbol();
    this.animateCursorSymbol(0); // Start animation from scale 0
    this.positionTooltip();
    this.tooltipBox.style.opacity = "1";
  }

  positionTooltip() {
    const elementRect = this.element.getBoundingClientRect();
    const tooltipRect = this.tooltipBox.getBoundingClientRect();
    this.tooltipBox.style.left =
      elementRect.left + elementRect.width / 2 - tooltipRect.width / 2 + "px";
    this.tooltipBox.style.top = elementRect.top - tooltipRect.height - 5 + "px";
  }

  hideTooltip() {
    this.tooltipBox.style.opacity = "0";
    document.body.removeChild(this.tooltipBox);
    this.tooltipBox = null;
    this.hideCursorSymbol();
  }
}

// Initialize tooltip
document.querySelectorAll("[data-tooltip]").forEach((trigger) => {
  new Tooltip(trigger);
});
