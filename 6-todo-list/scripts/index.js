import { TaksLocalStorage } from "./localstorage/task-localstorage.js";
import { CreateTaskUseCase } from "./use-case/create-task-use-case.js";
import { DeleteTaskUseCase } from "./use-case/delete-task-use-case.js";
import { EditTaskUseCase } from "./use-case/edit-task-use-case.js";
import { fetchManyTasksUseCase } from "./use-case/fetch-many-tasks.js";
import { getTaskUseCase } from "./use-case/get-task-use-case.js";

const addTaskButton = document.querySelector(".add-task");
const taskList = document.querySelector(".tasks");

(function renderTasks() {
  const tasks = new fetchManyTasksUseCase(TaksLocalStorage).execute();

  tasks.map((task) => {
    mountTask(task);
  });
})();

document.addEventListener("keydown", (data) => {
  if (data.key === "Enter") {
    createNewTask();
  }
});

addTaskButton.addEventListener("click", () => {
  createNewTask();
});

function mountTask({ taskId, status = "pendente", description = "" }) {
  taskList.insertAdjacentHTML(
    "beforeBegin",
    `
    <div class="task" id="${taskId}">
      <input id="checkbox-${taskId}" type="checkbox" ${
      status !== "pendente" && "checked"
    }/>
      <input id="text-${taskId}" type="text" placeholder="Digite uma tarefa..." value="${description}" />

      <iconify-icon class="material-symbols:delete" taskId="${taskId}" icon="material-symbols:delete" width="16" height="16" style="color: #FFF; cursor: pointer;"></iconify-icon>
    </div>
    `
  );

  const deleteElements = document.getElementsByClassName(
    "material-symbols:delete"
  );
  for (const deleteElement of deleteElements) {
    deleteElement.onclick = () => {
      const taskId = Number(deleteElement.getAttribute("taskId"));
      deleteTask(taskId);

      const taskElement = document.getElementById(taskId);
      taskElement.remove();
    };
  }

  const textInput = document.getElementById(`text-${taskId}`);
  textInput.style.width = `${textInput.value.length * 9}px`;

  watchedEdit(taskId);
}

function deleteTask(taskId) {
  const deleteTaskUseCase = new DeleteTaskUseCase(TaksLocalStorage);
  deleteTaskUseCase.execute(taskId);
}

function createNewTask() {
  const taskId = new Date().getTime();
  mountTask({ taskId });

  const textInput = document.getElementById(`text-${taskId}`);
  textInput.focus();

  const createNewTaskUseCase = new CreateTaskUseCase(TaksLocalStorage);
  createNewTaskUseCase.execute({
    taskId,
    status: "pendente",
    description: "",
  });

  textInput.addEventListener("focusout", () => {
    if (!textInput.value) {
      const taskElement = document.getElementById(taskId);
      taskElement.remove();

      deleteTask(taskId);
    }
  });
}

function watchedEdit(taskId) {
  const input = document.getElementById(`text-${taskId}`);
  const checkbox = document.getElementById(`checkbox-${taskId}`);
  const editTaskUseCase = new EditTaskUseCase(TaksLocalStorage);

  input.addEventListener("keypress", () => {
    input.style.width = `${input.value.length * 9}px`;
  });

  input.addEventListener("keyup", () => {
    const task = new getTaskUseCase(TaksLocalStorage).execute(taskId);
    editTaskUseCase.execute({
      taskId,
      status: task.status,
      description: input.value,
    });
  });

  checkbox.addEventListener("change", (data) => {
    const task = new getTaskUseCase(TaksLocalStorage).execute(taskId);
    editTaskUseCase.execute({
      taskId,
      description: task.description,
      status: data.srcElement.checked ? "concluida" : "pendente",
    });
  });
}
