document.addEventListener("DOMContentLoaded", () => {
  const svg = document.querySelector("#homeIcon svg");
  svg.setAttribute("width", "30");
  svg.setAttribute("height", "50");

  const paths = svg.querySelectorAll("path");
  paths.forEach((path) => {
    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none"); // Устанавливаем заливку в 'none'
  });

  const homeIcon = document.getElementById("homeIcon");
  homeIcon.addEventListener("mouseover", () => {
    document.querySelector("#line2").style.opacity = 1;
    document.querySelector("#line3").style.opacity = 1;
  });

  homeIcon.addEventListener("mouseout", () => {
    document.querySelector("#line2").style.opacity = 0;
    document.querySelector("#line3").style.opacity = 0;
  });
});
