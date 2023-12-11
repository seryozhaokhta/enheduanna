class ContentsToggler {
  constructor(buttonId, sectionId, iconId) {
    this.button = document.getElementById(buttonId);
    this.contentsSection = document.getElementById(sectionId);
    this.icon = document.getElementById(iconId);
    this.isOpen = false;

    this.contentsSection.style.maxHeight = "0";
    this.contentsSection.style.opacity = "0";
    this.setButtonText("List of content");
    this.icon.src = "./icons/open_content.svg";

    this.button.addEventListener("click", () => this.toggle());
  }

  toggle() {
    this.toggleHeight();
    this.toggleOpacity();
    this.toggleIcon();
  }

  toggleHeight() {
    if (this.isOpen) {
      this.contentsSection.style.maxHeight = "0";
    } else {
      this.contentsSection.style.maxHeight =
        this.contentsSection.scrollHeight + "px";
    }
  }

  toggleOpacity() {
    if (this.isOpen) {
      this.contentsSection.style.opacity = "0";
      this.setButtonText("List of content");
    } else {
      this.contentsSection.style.opacity = "1";
      this.setButtonText("Close");
    }
    this.isOpen = !this.isOpen;
  }

  toggleIcon() {
    if (this.isOpen) {
      this.icon.src = "./icons/close_content.svg";
    } else {
      this.icon.src = "./icons/open_content.svg";
    }
  }

  setButtonText(text) {
    // Assuming the first child is the text node. If the structure of the button changes, this method might need updates.
    this.button.childNodes[0].nodeValue = text;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  new ContentsToggler("toggle-contents-button", "contents-section", "icon");
});
