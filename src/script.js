const taskForm = document.getElementById("task-form");
const addTask = document.getElementById("add-task");
const taskInput = document.getElementById("task-input");
const taskListContainer = document.getElementById("task-list-container");
const taskListHeader = document.getElementById("task-list-header");
const taskMessage = document.getElementById("task-message");
// note array to store task
const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

// note : render task list
const renderTaskList = () => {
  taskListContainer.innerHTML = "";
  taskList.forEach(({ id, task }, index) => {
    taskListContainer.innerHTML += `
    <div class=" min-h-20 bg-white mb-1 p-3 border border-solid border-gray-300 delete" id="${id}">
      <p class="font-semibold text-xl">Task <span class="text-red-500">${index + 1}</span>: <span class="font-semibold"></span></p>
        <p class=" text-justify px-5 py-2 text-lg break-words">${task}</p>
         <!-- note : delete button container -->
        <div class=" flex justify-end">
          <button class="w-[50px] h-[35px] bg-white text-red-500 text-2xl" onclick="deleteTask(this)">
            <i class="fa-solid fa-trash transition-colors delay-100 ease-linear hover:text-red-700"></i>
          </button>
        </div>
    </div>
    `;
  });
};

// note : count task list
const countTaskLis = () => {
  const count = taskList.length;
  if (count) {
    taskMessage.innerHTML = `You have \( <span class="italic text-red-500">${count}</span> \) task`;
  } else {
    taskMessage.innerHTML = "You don't have any task";
  }
};

// note : check if task list is empty
if (taskList.length > 0) {
  renderTaskList();
  countTaskLis();
}

// ! delete task handler
const deleteTask = (buttonEl) => {
  const taskObj = buttonEl.closest(".delete");
  const taskIndex = taskList.findIndex((item) => {
    return item.id === taskObj.id;
  });
  taskList.splice(taskIndex, 1);
  buttonEl.closest(".delete").remove();
  localStorage.setItem("taskList", JSON.stringify(taskList));
  renderTaskList();
  countTaskLis();
};

// note : reset input field
const resetInputTask = () => {
  taskInput.value = "";
};

// note : create unique id
const uniqueid = () => {
  let key = "";
  for (let i = 0; i < 10; i++) {
    key += Math.floor(Math.random() * 10);
  }
  return key;
};
// note : add to task list
const addToTaskList = (task) => {
  const taskObj = {
    id: `${uniqueid()}-${Date.now()}`,
    task: String(task),
  };
  taskList.push(taskObj);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  countTaskLis();
};

// note : remove special characters
const removeSpecialCharacters = (task) => {
  const regEx = /[^a-zA-Z0-9\-\s]/g;
  const validatedTask = task.replace(regEx, "");
  return validatedTask;
};

// note : add task handler
const addTaskHandler = () => {
  const task = taskInput.value.trim();
  if (task) {
    addToTaskList(removeSpecialCharacters(task));
    renderTaskList();
    resetInputTask();
  } else {
    taskListHeader.innerHTML = "Input task can't be empty";
    setTimeout(() => {
      taskListHeader.innerHTML = "Task List";
    }, 3000);
  }
};

// note : event handlers
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTaskHandler();
});
