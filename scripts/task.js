class Task {
  constructor(id, description) {
    if (id) {
      this.id = id;
    } else {
      this.id = Task.counter++;
      Task.updateCounter();
    }

    this.description = description;
  }
}

let counter = localStorage.getItem("taskCounter");
if (!counter) {
  counter = 1;
}

Task.counter = counter;

Task.updateCounter = function () {
  localStorage.setItem("taskCounter", Task.counter);
};

export default Task;
