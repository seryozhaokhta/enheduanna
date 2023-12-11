// Определение состояний
const states = {
  BEFORE: "before",
  AKKAD: "akkad",
};

// Текущее состояние
let currentState = states.BEFORE;

// Функция анимации эллипсов
function animateEllipses(ellipses, growing) {
  ellipses.forEach((ellipse) => {
    ellipse.classList.remove("growing", "shrinking");
    ellipse.classList.add(growing ? "growing" : "shrinking");
  });
}

// Переключение на состояние "До"
function switchToBefore() {
  animateEllipses(document.querySelectorAll(".city-ellipse:not(.akkad)"), true);
  animateEllipses(document.querySelectorAll(".city-ellipse.akkad"), false);
  currentState = states.BEFORE;

  // Обновление стилей кнопок
  document.getElementById("btnBefore").classList.add("active");
  document.getElementById("btnAkkad").classList.remove("active");
}

// Переключение на состояние "Аккад"
function switchToAkkad() {
  animateEllipses(
    document.querySelectorAll(".city-ellipse:not(.akkad)"),
    false
  );
  animateEllipses(document.querySelectorAll(".city-ellipse.akkad"), true);
  currentState = states.AKKAD;

  // Обновление стилей кнопок
  document.getElementById("btnAkkad").classList.add("active");
  document.getElementById("btnBefore").classList.remove("active");
}

// Обработчики событий для кнопок
document.getElementById("btnBefore").addEventListener("click", switchToBefore);
document.getElementById("btnAkkad").addEventListener("click", switchToAkkad);
