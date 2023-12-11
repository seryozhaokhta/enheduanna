document.addEventListener("DOMContentLoaded", showLoader);

function showLoader() {
  document.querySelector(".preloader").style.display = "fixed";
}

function showButton() {
  document.querySelector(".overlay-button").style.display = "block"; // Показать кнопку
}

function hideLoader() {
  document.querySelector(".preloader").style.display = "none"; // Скрыть прелоадер
  showButton(); // Затем показать кнопку
}
