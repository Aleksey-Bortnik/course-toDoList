export default class Tabs {
  constructor() {
    this.tabButtons = document.querySelectorAll(".tab-btn");
    this.tabContents = document.querySelectorAll(".tab-content");
    this.init();
  }

  init() {
    for (let tabButton of this.tabButtons) {
      tabButton.addEventListener("click", (event) => {
        this.removeActiveTabs();
        event.target.classList.add("tab-active");

        for (let tabContent of this.tabContents) {
          tabContent.getAttribute("tabNumber");
          let contentNumber = tabContent.getAttribute("tabNumber");

          if (contentNumber === event.target.getAttribute("tabNumber")) {
            tabContent.classList.add("tab-active");
          }
        }
      });
    }
  }
  removeActiveTabs() {
    for (let tabButton of this.tabButtons) {
      tabButton.classList.remove("tab-active");
    }
    for (let tabContent of this.tabContents) {
      tabContent.classList.remove("tab-active");
    }
  }
}
