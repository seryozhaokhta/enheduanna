let lastScrollTop = 0;

window.addEventListener(
  "scroll",
  function () {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
      document.querySelector("header").style.top = "-100px"; // Предполагая, что высота хедера около 100px
    } else {
      document.querySelector("header").style.top = "0px";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  },
  false
);
