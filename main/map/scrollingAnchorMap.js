class SmoothScroller {
  constructor(smoothness = "smooth") {
    this.smoothness = smoothness;
  }

  scrollToTarget(event) {
    const targetId = event.target.getAttribute("data-target");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: this.smoothness,
      });
    }
  }
}

// Ждем, пока весь DOM загрузится
document.addEventListener("DOMContentLoaded", function () {
  const scroller = new SmoothScroller("smooth"); // Инициализация экземпляра SmoothScroller

  // Привязываем события клика к кнопкам
  const btnBefore = document.getElementById("btnBefore");
  if (btnBefore) {
    btnBefore.addEventListener("click", (event) =>
      scroller.scrollToTarget(event)
    );
  }

  const btnAkkad = document.getElementById("btnAkkad");
  if (btnAkkad) {
    btnAkkad.addEventListener("click", (event) =>
      scroller.scrollToTarget(event)
    );
  }
});
