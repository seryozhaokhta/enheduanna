document.addEventListener("DOMContentLoaded", () => {
  class SubtitleAnimator {
    constructor(triggerElement, subtitlesArea) {
      this.triggerElement = triggerElement;
      this.subtitlesArea = subtitlesArea;
      this.subtitles = document.querySelectorAll(".subtitle");
      this.bindEvents();
    }

    bindEvents() {
      this.triggerElement.addEventListener("mouseenter", () =>
        this.showSubtitles()
      );

      this.subtitlesArea.addEventListener("mouseleave", () =>
        this.hideSubtitles()
      );

      this.subtitles.forEach((subtitle) => {
        subtitle.addEventListener("mouseenter", () => {
          this.makeActive(subtitle);
        });
        subtitle.addEventListener("mouseleave", () => {
          this.makeInactive();
        });
      });
    }

    showSubtitles() {
      this.subtitles.forEach((subtitle) => {
        subtitle.style.opacity = 0.5;
      });
    }

    hideSubtitles() {
      this.subtitles.forEach((subtitle) => {
        subtitle.style.opacity = 0;
      });
    }

    makeActive(subtitle) {
      subtitle.style.opacity = 1;
      this.subtitles.forEach((otherSubtitle) => {
        if (otherSubtitle !== subtitle) {
          otherSubtitle.style.opacity = 0.5;
        }
      });
    }

    makeInactive() {
      this.subtitles.forEach((subtitle) => {
        subtitle.style.opacity = 0.5;
      });
    }
  }

  const hymnsTrigger = document.getElementById("hymns-trigger");
  const subtitlesArea = document.getElementById("subtitles-area");
  const subtitleAnimator = new SubtitleAnimator(hymnsTrigger, subtitlesArea);
});
