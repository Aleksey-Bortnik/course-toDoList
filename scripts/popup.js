import allTables from "./allTables.js";
import Task from "./task.js";

export default class PopUp {
  constructor() {
    this.modalElement = document.querySelector(".modal");
    this.openBtnElement = document.getElementById("open-new-task-popup");
    this.popupElement = document.querySelector(".popup");
    this.inputs = document.querySelectorAll("input");
    this.closeBtnElements = document.querySelectorAll(".close");
    this.okBtnElement = document.getElementById("add-task");

    this.openBtnElement.onclick = this.openModal.bind(this);
    for (let closeBtnElement of this.closeBtnElements) {
      closeBtnElement.onclick = this.closeModal.bind(this);
    }

    document.body.onclick = this.clickOutsideOfModal.bind(this);

    this.popupElement.onclick = function (event) {
      event.stopPropagation();
    };

    this.okBtnElement.onclick = function () {
      let task = new Task(
        null,
        document.getElementById("task-description-input").value
      );

      allTables.current.addTask(task);
      this.closeModal();
    }.bind(this);
  }

  openModal(event) {
    this.modalElement.classList.add("open");
    event.stopPropagation();
  }

  closeModal() {
    this.modalElement.classList.remove("open");
    this.inputs.forEach((el) => (el.value = ""));
  }

  clickOutsideOfModal(event) {
    if (this.popupElement.contains(event.currentTarget)) {
      return;
    } else {
      this.closeModal();
    }
  }
}
