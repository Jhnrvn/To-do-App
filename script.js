const taskInput = document.getElementById("task-input");
const taskForm = document.getElementById("task-form");
const taskHeaderText = document.getElementById("task-header-text");
const taskListContainer = document.getElementById("task-list-container");
const taskList = [];
const task = {};

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

const deleteTask = (buttonEl) => {
  const dataArrIndex = taskList.findIndex((item) => item.id === buttonEl.parentElement.id);
  console.log(dataArrIndex);
  buttonEl.parentElement.remove();
  taskList.splice(dataArrIndex, 1);
};

const reset = () => {
  taskInput.value = "";
};

const validateInput = (task) => {
  const regex = /[^A-Za-z0-9\-\s]/g;
  return task.replace(regex, "");
};
const createId = (task) => {
  const regex = /[\(\)\s_:,\-\\\/.]/gi;
  const randomNumber = Math.floor(Math.random() * 1000);
  return task.replace(regex, randomNumber);
};

const addTaskToList = (task) => {
  const taskToBeAdded = {
    id: `${createId(task)}-${Date.now()}`,
    userTask: task,
  };

  taskList.push(taskToBeAdded);
  updateTaskListContainer();
  reset();
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

// add task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});
