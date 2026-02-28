const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

function updateCount() {
    const totalTasks = document.querySelectorAll("#taskList li").length;
    const completedTasks = document.querySelectorAll(".completed").length;
    taskCount.textContent = `Total: ${totalTasks} | Completed: ${completedTasks}`;
}

addButton.addEventListener("click", function () {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    // Prevent duplicate tasks
    const existingTasks = document.querySelectorAll("#taskList li span");
    for (let item of existingTasks) {
        if (item.textContent.toLowerCase() === task.toLowerCase()) {
            alert("Task already exists!");
            taskInput.value = "";
            return;
        }
    }

    const li = document.createElement("li");

    // Circle button
    const checkBtn = document.createElement("div");
    checkBtn.classList.add("checkBtn");

    const span = document.createElement("span");
    span.textContent = task;
    span.style.flex = "1";
    span.style.marginLeft = "10px";

    // Toggle complete
    checkBtn.addEventListener("click", function () {
        checkBtn.classList.toggle("completedCircle");

        if (checkBtn.classList.contains("completedCircle")) {
            checkBtn.innerHTML = "✔";
            span.classList.add("completed");
        } else {
            checkBtn.innerHTML = "";
            span.classList.remove("completed");
        }

        updateCount();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");

    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateCount();
    });

    li.appendChild(checkBtn);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";

    updateCount();
});

