let taskForm = document.getElementById("taskForm");
let taskName = document.querySelector("#taskName");
let taskDate = document.querySelector("#taskDate");
let taskCount = document.querySelector("#count");
let tasksCreated = document.querySelector(".tasksCreated");

let errorDisplay = document.querySelector(".errorDisplay");

let taskCounter = 0;

function showError() {
  errorDisplay.style.display = "block";
}

function validateTask(event) {
  event.preventDefault();
  errorDisplay.style.display = "none";

  const taskNameVal = validateTaskName();
  if (taskNameVal === false) {
    showError();
    return false;
  }

  const taskDateVal = validateDate();
  if (taskDateVal === false) {
    showError();
    return false;
  }

  if (true) {
    storeValues();
  }

  return true;
}

function validateTaskName() {
  let name = taskName.value;

  if (name === "") {
    errorDisplay.textContent = "Task Name cannot be empty";
    return false;
  }
}

function validateDate() {
  let date = new Date(taskDate.value);
  let currentDate = new Date();
  if (!date) {
    errorDisplay.textContent = "You must enter a date";
    return false;
  }

  if (date <= currentDate) {
    errorDisplay.textContent = "Date cannot be in the past";
    return false;
  }
}

function storeValues() {
  let nameStorage = taskName.value;
  let dateStorage = taskDate.value;

  const oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let task = {};

  Object.assign(task, {
    newTaskName: `${nameStorage}`,
    newTaskDate: `${dateStorage}`,
  });

  oldTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(oldTasks));

  oldTasks.forEach((task) => {
    tasksCreated.appendChild(createTask(task.newTaskName, task.newTaskDate));
  });

  // Clear all form fields
  taskForm.reset();
}

function createTask(newTaskName, newTaskDate) {
  const frag = document.createDocumentFragment();
  let newEl = (s) => document.createElement(s);

  let taskDiv = frag.appendChild(newEl("div"));
  taskDiv.classList.add("taskElement");
  let taskName = taskDiv.appendChild(newEl("p"));
  taskName.classList.add("taskss");
  taskName.textContent = `${newTaskName}`;
  let taskDate = taskDiv.appendChild(newEl("p"));
  taskDate.classList.add("taskss");
  taskDate.textContent = `${newTaskDate}`;
  let taskComplete = taskDiv.appendChild(newEl("button"));
  taskComplete.appendChild(document.createTextNode(`Mark as Done`));
  taskComplete.classList.add("taskComplete");

  taskCounter++;
    taskCount.textContent = `${taskCounter}`;
    alert("Task Added");

    return frag;
}

function deleteTask(event) {
  event.preventDefault();
  if (event.target.classList.contains("taskComplete")) {
    let task = event.target.parentElement;
    let btn = event.target;
    task.style.textDecoration = "line-through";
    setTimeout(alert("Task Completed 🥳", 5000));
    btn.style.backgroundColor = "green";
    event.target.textContent = "Completed";
    taskCounter--;
    taskCount.textContent = `${taskCounter}`;
  }
}

taskForm.addEventListener("submit", validateTask);

tasksCreated.addEventListener("click", deleteTask);

window.addEventListener("beforeunload", () => localStorage.removeItem("tasks"));
