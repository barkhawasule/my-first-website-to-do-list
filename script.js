document.getElementById("addBtn").addEventListener("click", addTask);
loadTasks();

// Add new task
function addTask() {
    let taskValue = document.getElementById("taskInput").value;
    let priority = document.getElementById("prioritySelect").value;

    if (taskValue.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: taskValue,
        priority: priority,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("taskInput").value = "";
    loadTasks();
}

// Load tasks inside table
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let table = document.getElementById("taskTable");
    table.innerHTML = "";

    tasks.forEach((task, index) => {
        let priorityClass = 
            task.priority === "High" ? "priority-high" :
            task.priority === "Medium" ? "priority-medium" : "priority-low";

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="${task.completed ? 'completedText' : ''}">${task.text}</td>
            <td class="${priorityClass}">${task.priority}</td>
            <td>${task.completed ? '<span class="tick">✔</span>' : 'Pending'}</td>

            <td>
                <button class="editBtn" onclick="editTask(${index})">Edit</button>
                <button class="deleteBtn" onclick="deleteTask(${index})">X</button>
                <button class="completeBtn" onclick="toggleComplete(${index})">Done</button>
            </td>
        `;

        table.appendChild(row);
    });
    let row = document.createElement("tr");

// Highlight high priority pending tasks
if(task.priority === "High" && !task.completed) {
    row.classList.add("high-priority-row");
}

}

// Complete Task
function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = true;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// Edit Task (with priority)
function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    let newText = prompt("Edit task:", tasks[index].text);
    let newPriority = prompt("Edit priority (High/Medium/Low):", tasks[index].priority);

    if (newText && newText.trim() !== "" &&
        (newPriority === "High" || newPriority === "Medium" || newPriority === "Low")) 

    {
        tasks[index].text = newText;
        tasks[index].priority = newPriority;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    } 
    else {
        alert("Invalid priority! Use: High, Medium, Low");
    }
}

// Delete Task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
function showImportantTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let importantTasks = tasks.filter(task => task.priority === "High" && !task.completed);

    if (importantTasks.length > 0) {
        let names = importantTasks.map(task => task.text).join(", ");
        alert(`⚠ Today’s important task(s): ${names}`);
    } else {
        console.log("No high priority tasks pending today!");
    }
}



