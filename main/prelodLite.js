document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");
  const preloader = document.getElementById("videoPreloader");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Предотвращает немедленный переход по ссылке
      const href = link.getAttribute("href");

      preloader.style.display = "flex"; // Показывает прелоадер

      setTimeout(() => {
        window.location.href = href; // Перенаправляет на новую страницу после небольшой задержки
      }, 2000); // Задержка в миллисекундах, в течение которой показывается прелоадер
    });
  });
});
