class ToggleSection {
  constructor(buttonId, sectionId, templateId) {
    this.toggleButton = document.getElementById(buttonId);
    this.section = document.getElementById(sectionId);
    this.template = document.getElementById(templateId);
    this.isCollapsed = true; // Assuming the section is collapsed initially

    this.toggleButton.addEventListener("click", () => {
      this.toggle();
    });

    // Insert the text initially
    if (this.template) {
      const content = document.importNode(this.template.content, true);
      this.section.appendChild(content);
    } else {
      console.error(`Template with id ${templateId} not found`);
      return;
    }
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.section.classList.toggle("collapsed", this.isCollapsed);
  }
}

new ToggleSection(
  "toggleIntroduction",
  "introContainer",
  "introductionTemplate",
);


