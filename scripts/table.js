import allTables from "./allTables.js";
import Task from "./task.js";

export default class Table {
  constructor(id) {
    this.id = id;
    this.list = document.getElementById(id);
    this.renderFromLocalStorage();
  }

  renderFromLocalStorage() {
    let tableData = this.getTableData();

    if (tableData) {
      for (let task of tableData) {
        this.addTask(task);
      }
    }
  }

  getTableData() {
    let tableJson = localStorage.getItem(this.id);

    // parse an empty array instead of null if there is no data
    let tableData = JSON.parse(tableJson || "[]");

    return tableData;
  }

  addTask(task) {
    //=======================================================================!!!
    const taskElement = document.createElement("li");

    const taskIdAttribute = document.createAttribute("task-id");
    taskIdAttribute.value = task.id;
    taskElement.setAttributeNode(taskIdAttribute);

    taskElement.innerHTML = task.description;
    this.addButtons(taskElement);
    // HTML Шрёдингера.
    this.list.appendChild(taskElement);

    const tableData = this.getTableData();
    if (
      !tableData.filter((localStorageTask) => localStorageTask.id === task.id)
        .length
    ) {
      tableData.push(task);
      localStorage.setItem(this.id, JSON.stringify(tableData));
    }
  }

  addButtons(taskElement) {
    switch (this.id) {
      case "current-list":
        this.addDoneButton(taskElement);
        this.addDeleteButton(taskElement);
        break;
      case "done-list":
        this.addReturnToActiveButton(taskElement);
        break;
      case "deleted-list":
        this.addReturnToActiveButton(taskElement);
        break;
    }
  }

  addReturnToActiveButton(taskElement) {
    this.addMovingButton( taskElement, "return-btn", "Вернуть", "current");
  }

  addDoneButton(taskElement) {
    this.addMovingButton(taskElement, "done-btn", "Готово", "done");
  }

  addDeleteButton(taskElement) {
    this.addMovingButton(taskElement, "delete-btn", "Удалить", "deleted");
  }

  addMovingButton(taskElement, buttonClass, buttonInnerHtml, tableName) {
    //===================================================!!!
    const movingButton = document.createElement("button");
    movingButton.classList.add(buttonClass);
    movingButton.innerHTML = buttonInnerHtml;

    movingButton.addEventListener("click", function () {
        taskElement.remove();

        const taskId = taskElement.getAttribute("task-id");

        const tableData = this.getTableData();

        for (let i = 0; i < tableData.length; i++) {
          const tableDataTask = tableData[i];

          if (tableDataTask.id == taskId) {
            tableData.splice(i, 1);
            localStorage.setItem(this.id, tableData);
            break;
          }
        }

        let task = new Task(taskId, taskElement.childNodes[0].textContent);
        allTables[tableName].addTask(task);
      }.bind(this)
    );

    taskElement.appendChild(movingButton);
  }
}
