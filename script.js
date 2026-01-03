const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
const dateEl = document.getElementById("date");

/* ================= TIME ================= */
function updateTime() {
  const now = new Date();
  dateEl.textContent = now.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
updateTime();

/* ================= ADD TASK ================= */
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("priority");

  if (!taskInput.value.trim()) {
    alert("Tugas tidak boleh kosong!");
    return;
  }

  const row = document.createElement("tr");

  /* Checkbox */
  const checkTd = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkTd.appendChild(checkbox);

  /* Task */
  const taskTd = document.createElement("td");
  taskTd.textContent = taskInput.value;

  /* level */
  const priorityTd = document.createElement("td");
  priorityTd.textContent = prioritySelect.value;

  /* Time */
  const timeTd = document.createElement("td");
  timeTd.textContent = getDateTimeNow();

  /* Delete */
  const actionTd = document.createElement("td");
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => row.remove();
  actionTd.appendChild(delBtn);

  /* Checkbox event */
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      row.classList.add("done-item");
      markDone(taskTd.textContent, priorityTd.textContent);
    } else {
      row.classList("done-item");
      
    }
    
  });

  row.append(checkTd, taskTd, priorityTd, timeTd, actionTd);
  todoList.appendChild(row);

  taskInput.value = "";
  prioritySelect.value = "Medium";
}

/* ================= DONE ================= */
function markDone(taskText, priority) {
  const li = document.createElement("li");
  li.classname = "done-item"; 

  li.innerHTML = `
    <strong>${taskText} (${priority})</strong><br>
    <small>📅 ${getDateTimeNow()}</small>
  `;
  doneList.appendChild(li);
}

/* ================= DELETE ALL ================= */
function deleteAll() {
  if (!confirm("Hapus semua data?")) return;
  todoList.innerHTML = "";
  doneList.innerHTML = "";
}

/* ================= TIME HELPER ================= */
function getDateTimeNow() {
  const now = new Date();
  return now.toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
