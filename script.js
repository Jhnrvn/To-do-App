const taskInput = document.getElementById("task-input");
const taskForm = document.getElementById("task-form");
const taskHeaderText = document.getElementById("task-header-text");
const taskListContainer = document.getElementById("task-list-container");
const taskCountText = document.getElementById("task-count-text");
const taskList = JSON.parse(localStorage.getItem("data")) || [];
const task = {};

const checkTaskCount = () => {
  if (taskList.length > 0) {
    taskCountText.innerText = `You have ${taskList.length} tasks`;
  } else {
    taskCountText.innerText = "You don't have any tasks";
  }
};

const updateTaskListContainer = () => {
  taskListContainer.innerHTML = "";
  taskList.forEach(({ id, userTask }, index) => {
    taskListContainer.innerHTML += `
    <div  id="${id}" class="task">
      <p class="task-title">Task ${index + 1}: <span>${userTask}</span></p>
      <button type="button" class="delete-task-btn" onclick="deleteTask(this)"><i class="fa-solid fa-trash-can"></i></button>
    </div>
    `;
  });
};

if (taskList) {
  updateTaskListContainer();
  checkTaskCount();
}

// delete task
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskList.findIndex((item) => item.id === buttonEl.parentElement.id);
  console.log(dataArrIndex);
  buttonEl.parentElement.remove();
  taskList.splice(dataArrIndex, 1);
  checkTaskCount();
  localStorage.setItem("data", JSON.stringify(taskList));
  updateTaskListContainer();
};

// reset input field
const reset = () => {
  taskInput.value = "";
};

// validate input. remove special characters
const validateInput = (task) => {
  const regex = /[^A-Za-z0-9\-\s]/g;
  return task.replace(regex, "");
};
// create unique id
const createId = (task) => {
  const regex = /[\(\)\s_:,\-\\\/.]/gi;
  const randomNumber = Math.floor(Math.random() * 1000);
  return task.replace(regex, randomNumber);
};

const addTaskToList = (task) => {
  const taskToBeAdded = {
    id: `${createId(task)}-${Date.now()}`,
    userTask: task.slice(0, 30),
  };

  taskList.push(taskToBeAdded);
  localStorage.setItem("data", JSON.stringify(taskList));
  updateTaskListContainer();
  reset();
  checkTaskCount();
};

const addTask = () => {
  const task = taskInput.value.trim();
  if (task) {
    addTaskToList(validateInput(task));
  } else {
    taskHeaderText.innerText = "Please enter a task";
    setTimeout(() => {
      taskHeaderText.innerText = "Tasks List";
    }, 3000);
  }
};

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  } else if (taskInput.value.length >= 40) {
    taskHeaderText.innerText = "Please enter a maximum of 40 characters";
    setTimeout(() => {
      taskHeaderText.innerText = "Tasks List";
    }, 3000);
  }
  taskInput.value = taskInput.value.slice(0, 40);
  console.log(taskInput.value.length);
});

// add task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});
