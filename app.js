let tasks = [];

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = savedTasks;
  renderTasks();
}

function renderTasks() {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    if (task.completed) taskElement.classList.add("completed");

    taskElement.innerHTML = `
            <span>${task.name} - ${task.priority} - ${task.category} - Due: ${task.dueDate}</span>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
        `;

    taskList.appendChild(taskElement);
  });

  updateProgress();
}

function addTask() {
  const taskName = document.getElementById("task-name").value.trim();
  const priority = document.getElementById("priority").value;
  const category = document.getElementById("category").value;
  const dueDate = document.getElementById("due-date").value;

  if (taskName && priority && category && dueDate) {
    const task = { name: taskName, priority, category, dueDate, completed: false };
    tasks.push(task);
    saveTasks();
    renderTasks();
    document.getElementById("task-name").value = "";
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100 || 0;
  document.getElementById("task-progress").value = progress;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".app-container").classList.toggle("dark-mode");
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => button.classList.toggle("dark-mode"));
}

document.getElementById("add-task").addEventListener("click", addTask);
document.getElementById("theme-toggle").addEventListener("click", toggleDarkMode);

window.onload = loadTasks;