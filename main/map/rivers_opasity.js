class RiverOpacityControl {
  constructor(riverMapElement) {
    this.riverMapElement = riverMapElement;
    this.container = riverMapElement.parentElement;

    this.firstInteraction = true; // флаг, чтобы отслеживать первое взаимодействие

    this.initEvents();
  }

  setOpacity(x, y) {
    if (this.firstInteraction) {
      this.riverMapElement.style.opacity = "0.25";
      this.firstInteraction = false;
      return;
    }

    const rect = this.container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const distanceFromCenter = Math.sqrt(
      (x - centerX) ** 2 + (y - centerY) ** 2
    );
    const maxDistanceFromCenter = Math.sqrt(centerX ** 2 + centerY ** 2);

    const opacity = 0.75 - 0.5 * (distanceFromCenter / maxDistanceFromCenter);
    this.riverMapElement.style.opacity = Math.max(opacity, 0.25).toFixed(2);
  }

  resetOpacity() {
    this.riverMapElement.style.opacity = "0.25";
  }

  initEvents() {
    this.container.addEventListener("mousemove", (event) => {
      const x = event.clientX - event.target.getBoundingClientRect().left;
      const y = event.clientY - event.target.getBoundingClientRect().top;
      this.setOpacity(x, y);
    });

    this.container.addEventListener("mouseleave", () => {
      this.resetOpacity();
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const riverMap = document.querySelector(".river-map");
  new RiverOpacityControl(riverMap);
});
