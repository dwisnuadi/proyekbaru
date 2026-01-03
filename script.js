const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
const dateEl = document.getElementById("date");

// TIME
function updateTime() {
  const now = new Date();
  dateEl.textContent = now.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
updateTime();

// ADD TASK
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const priority = document.getElementById("priority");

  if (taskInput.value === "") {
    alert("Tugas tidak boleh kosong!");
    return;
  }

  const row = document.createElement("tr");

  // Checkbox
  const checkTd = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkTd.appendChild(checkbox);

  
  // Task text
  const taskTd = document.createElement("td");
  taskTd.textContent = taskInput.value;

  // Priority
  const priorityTd = document.createElement("td");
  priorityTd.textContent = priority.value;

  // Submit & Delete button
  const actionTd = document.createElement("td");
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => row.remove();
  actionTd.appendChild(delBtn);

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.style.marginLeft = "8px";
  doneBtn.onclick = () => markDone(row);
  actionTd.appendChild(doneBtn);
  doneBtn.disabled = true;

  row.append(checkTd, taskTd, priorityTd, actionTd);
  todoList.appendChild(row);

  taskInput.value = "";
  priority.value = "Medium";

  // Enable done button when checkbox is checked
  checkbox.onchange = () => {
    doneBtn.disabled = !checkbox.checked;
  };  
}

// DONE
function markDone(row) {
    const taskText = row.children[1].textContent;
    const priority = row.children[2].textContent;
    const doneTime = getDateTimeNow();
  row.remove();
  const li = document.createElement("li");
  li.textContent = `${taskText} (${priority})`;
  li.innerHTML = `
    <strong>${taskText} (${priority})</strong><br>
    <small>📅 ${doneTime}</small>
  `;
  doneList.appendChild(li);
}

// DELETE ALL
function deleteAll() {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
}

// DONE TIME 

function getDateTimeNow() {
  const now = new Date();
  return now.toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
