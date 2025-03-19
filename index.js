let taskForm = document.getElementById("taskForm");
let taskName = document.querySelector("#taskName");
let taskDate = document.querySelector("#taskDate");
let taskCount = document.querySelector("#count");
let taskHeading = document.querySelector(".tasks").firstElementChild;
let tasksCreated = document.querySelector(".tasksCreated");
let navBarEl = document.querySelector(".navbar-nav");
let errorDisplay = document.querySelector(".errorDisplay");

let taskCounter = 0;
// Display Error
function showError() {
  errorDisplay.style.display = "block";
}

// Navigation Links
const navLinks = [
  { text: "Settings", href: "#" },
  { text: "Logout", href: "#" },
];

// To create new elements
let newEl = (s) => document.createElement(s);

// Iterate through navLink
navLinks.forEach((link) => {
  // Create an a element
  let aEl = newEl("a");
  aEl.classList.add("nav-link");
  // Set the href value
  aEl.setAttribute("href", link.href);
  // Set the text value
  aEl.innerHTML = link.text;
  // Add the link to the navbar
  navBarEl.append(aEl);
});

// Validate the form
function validateTask(event) {
  event.preventDefault();
  errorDisplay.style.display = "none";

  // Validate the task Name
  const taskNameVal = validateTaskName();
  if (taskNameVal === false) {
    showError();
    return false;
  }
  // Validate the task Date
  const taskDateVal = validateDate();
  if (taskDateVal === false) {
    showError();
    return false;
  }

  // If taskName and taskDate evaluate to true store their values
  if (true) {
    storeValues();
  }

  return true;
}

// Evaluate taskName
function validateTaskName() {
  let name = taskName.value;

  // Check to see if taskName is empty
  if (name === "") {
    errorDisplay.textContent = "Task Name cannot be empty";
    taskName.focus();
    return false;
  }

  return true;
}
// Evaluate taskName
function validateDate() {
  let date = new Date(taskDate.value);
  // Get current date
  let currentDate = new Date();

  // Check to see is taskDate is empty
  if (taskDate.value === "") {
    errorDisplay.textContent = "You must enter a date";
    taskDate.focus();
    return false;
  }
  // check to see if taskDate is less than currentDate
  if (date <= currentDate) {
    errorDisplay.textContent = "Date cannot be in the past";
    return false;
  }
  return true;
}

// Store taskName and taskDateValues
function storeValues() {
  let nameStorage = taskName.value;
  let dateStorage = taskDate.value;

  // Create a task array if there is none in local Storage
  const oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // Create object to store task values
  let task = {};
  // Create pair values for the task object
  Object.assign(task, {
    newTaskName: `${nameStorage}`,
    newTaskDate: `${dateStorage}`,
  });
  // Add new task to the array of oldTasks
  oldTasks.push(task);
  // Update the array with the new task into local Storage
  localStorage.setItem("tasks", JSON.stringify(oldTasks));
  // Display the My Task heading in tasksEl
  taskHeading.style.display = "block";
  // Create a task using createTask() and add it to tasksCreated
  tasksCreated.appendChild(createTask(taskName.value, taskDate.value));

  // Clear all form fields
  taskForm.reset();
}
// Create a task to display
function createTask(newTaskName, newTaskDate) {
  // Create a document sragment
  const frag = document.createDocumentFragment();
  // Add Elements to the fragments and and classes
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

  //Increment Counter
  taskCounter++;
  // Change counter color
  taskCount.style.color = "#38b6ff";
  // Update the counter value
  taskCount.textContent = `${taskCounter}`;
  alert("Task Added");
  return frag;
}

// Strike Through a task when it is marked aas complete
function deleteTask(event) {
  event.preventDefault();
  // Check to see if the event triggered contains a classlist of "taskComplete"
  if (event.target.classList.contains("taskComplete")) {
    let task = event.target.parentElement;
    let btn = event.target;
    // Modify style
    task.style.textDecoration = "line-through";
    setTimeout(alert("Task Completed 🥳", 5000));
    // Set the attribute class to "markAsDone"
    btn.setAttribute("class", "markAsDone");
    // Change the text of the btn from "Mark As Done" to "Completed"
    event.target.textContent = "Completed";
    // Decrement the counter
    taskCounter--;
    // Update the counter
    taskCount.textContent = `${taskCounter}`;
  }
}

// EventListeners
taskForm.addEventListener("submit", validateTask);

tasksCreated.addEventListener("click", deleteTask);

window.addEventListener("beforeunload", () => localStorage.removeItem("tasks"));
