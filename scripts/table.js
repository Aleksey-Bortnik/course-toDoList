export default class Table {
  constructor(id, buttonsHtml) {
    this.list = document.getElementById(id);
    this.buttonsHtml = 
    renderFromLocalStorage(id);
  }

  renderFromLocalStorage(id) {
    let tableJson = localStorage.getItem(id);
    let tableData = JSON.parse(tableJson);
  }
  addTask(task) {
    this.list.innerHTML += `<li class="task-item">${task.description}<button></button></li>`
  }
}
