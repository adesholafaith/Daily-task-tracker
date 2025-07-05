const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Re-render tasks from LocalStorage
const renderTasks = () => {
  taskList.innerHTML = ""; // clear list first

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Create container for task text and date
    const taskContainer = document.createElement("div");
    taskContainer.style.display = "inline-block";

    // Task text
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.style.display = "block";
    taskText.style.cursor = "default";

    // Task date
    const taskDate = document.createElement("small");
    taskDate.textContent = task.date;
    taskDate.style.display = "block";
    taskDate.style.color = "#888"; // optional style

    taskContainer.appendChild(taskText);
    taskContainer.appendChild(taskDate);

    // Edit icon
    const editIcon = document.createElement("img");
    editIcon.src = "icons8-pencil.png";
    editIcon.alt = "Edit";
    editIcon.className = "edit-icon";

    // Edit on click
    editIcon.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.className = "edit-input";

      const save = () => {
        const newValue = input.value.trim();
        if (newValue !== "") {
          tasks[index].text = newValue;
          localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        renderTasks();
      };

      input.addEventListener("blur", save);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") save();
      });

      taskContainer.replaceChild(input, taskText);
      input.focus();
    });

    // Double-click to remove task
    li.addEventListener("dblclick", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    li.appendChild(taskContainer);
    li.appendChild(editIcon);
    taskList.appendChild(li);
  });
};


addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task === "") {
    alert("Enter a task");
    return;
  }

  tasks.push({ text: task, date: new Date().toLocaleDateString() });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
});


clearBtn.addEventListener("click", () => {
    tasks = []; 
    localStorage.removeItem("tasks");
    renderTasks();
});

taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTaskBtn.click();
});
renderTasks();

