let currentTooltip = null;
let isAnimating = false;
let lastActivatedElementId = null;
let isTooltipVisible = false;

function showInfoPopup(info, event, elementId) {
  const tooltip = document.getElementById("tooltip");
  const tooltipContent = document.getElementById("tooltipContent");

  if (lastActivatedElementId === elementId && isTooltipVisible) {
    closeTooltip();
    return;
  }

  lastActivatedElementId = elementId;

  if (currentTooltip && !isAnimating) {
    isAnimating = true;
    hideCurrentTooltip(() => {
      displayNewTooltip(tooltip, tooltipContent, info, event);
      isTooltipVisible = true;
    });
  } else if (!isAnimating) {
    displayNewTooltip(tooltip, tooltipContent, info, event);
    isTooltipVisible = true;
  }

  currentTooltip = tooltip;
}

function hideCurrentTooltip(callback) {
  currentTooltip.style.opacity = "0";
  currentTooltip.style.transform = "translateX(100%)";
  currentTooltip.style.animation = "slideOut 0.5s forwards";

  currentTooltip.addEventListener(
    "animationend",
    function handler() {
      this.style.display = "block";
      this.removeEventListener("animationend", handler);
      isAnimating = false;
      isTooltipVisible = false;
      currentTooltip = null;
      if (callback) callback();
    },
    { once: true }
  );
}

function displayNewTooltip(tooltip, tooltipContent, info, event) {
  const [title, mainInfo, mainTemple, additionalInfo] = info.split("\n");

  tooltipContent.innerHTML = `
    <h3 class="tooltip-title">${title}</h3>
    <p class="tooltip-main-info">${mainInfo}</p>
    <p class="tooltip-main-temple">${mainTemple}</p>
    <div class="tooltip-additional">${additionalInfo}</div>`;

  tooltip.style.display = "block";
  setTimeout(() => {
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateX(0)";
    tooltip.style.animation = "slideIn 0.5s forwards";
    tooltip.style.top = `${event.clientY}px`;
  }, 0);
}

function closeTooltip() {
  if (currentTooltip && !isAnimating) {
    isAnimating = true;
    hideCurrentTooltip();
  }
}
