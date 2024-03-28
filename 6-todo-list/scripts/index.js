import { TaksLocalStorage } from "./localstorage/task-localstorage.js";
import { CreateTaskUseCase } from "./use-case/create-task-use-case.js";
import { EditTaskUseCase } from "./use-case/edit-task-use-case.js";
import { fetchManyTasksUseCase } from "./use-case/fetch-many-tasks.js";
import { getTaskUseCase } from "./use-case/get-task-use-case.js";

const addTaskButton = document.getElementsByClassName("add-task")[0];
const taskList = document.getElementsByClassName("tasks")[0];

(function renderTasks() {
  const tasks = new fetchManyTasksUseCase(TaksLocalStorage).execute();

  tasks.map((task) => {
    mountTask(task);
  });
})();

addTaskButton.addEventListener("click", () => {
  createNewTask();
});

function mountTask({ taskId, status = "pendente", description = "" }) {
  taskList.insertAdjacentHTML(
    "beforeBegin",
    `
    <div class="task">
    <input id="checkbox-${taskId}" type="checkbox" ${
      status !== "pendente" && "checked"
    }/>
    <input id="text-${taskId}" type="text" placeholder="Digite uma tarefa..." value="${description}" />
    </div>
    `
  );
  watchedEdit({ taskId, status, description });
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
}

function watchedEdit({ taskId, ...props }) {
  const input = document.getElementById(`text-${taskId}`);
  const checkbox = document.getElementById(`checkbox-${taskId}`);
  const editTaskUseCase = new EditTaskUseCase(TaksLocalStorage);

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
