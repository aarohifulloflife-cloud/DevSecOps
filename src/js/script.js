// Pure functions — easy to unit test
function addTask(tasks, text) {
  if (!text || text.trim() === "") {
    return tasks;
  }
  return [...tasks, { id: Date.now(), text: text.trim(), completed: false }];
}

function deleteTask(tasks, id) {
  return tasks.filter(task => task.id !== id);
}

function toggleTask(tasks, id) {
  return tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
}

function countTasks(tasks) {
  return tasks.length;
}

// Export for Jest (only runs in Node, ignored by browser)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { addTask, deleteTask, toggleTask, countTasks };
}

// DOM logic — only runs in browser
if (typeof document !== "undefined") {
  let tasks = [];

  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");
  const counter = document.getElementById("counter");

  const render = () =>  {
    taskList.innerHTML = "";
    tasks.forEach(task => {
      const li = document.createElement("li");
      if (task.completed) li.classList.add("completed");

      const span = document.createElement("span");
      span.textContent = task.text;
      span.addEventListener("click", () => {
        tasks = toggleTask(tasks, task.id);
        render();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => {
        tasks = deleteTask(tasks, task.id);
        render();
      });

      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });

    counter.textContent = `${countTasks(tasks)} task${countTasks(tasks) === 1 ? "" : "s"}`;
  }

  addBtn.addEventListener("click", () => {
    tasks = addTask(tasks, taskInput.value);
    taskInput.value = "";
    render();
  });

  taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addBtn.click();
  });

  render();
}