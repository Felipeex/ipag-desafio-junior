import { TaksLocalStorage } from "./localstorage/task-localstorage.js";
import { CreateTaskUseCase } from "./use-case/create-task-use-case.js";

const addTaskButton = document.getElementsByClassName("add-task")[0];
const taskList = document.getElementsByClassName("tasks")[0];

addTaskButton.addEventListener("click", () => {
  const taskId = new Date().getTime();
  taskList.insertAdjacentHTML(
    "beforeBegin",
    `
      <div class="task">
        <input id="checkbox-${taskId}"type="checkbox" />
        <input id="text-${taskId}" type="text" placeholder="Digite uma tarefa..." />
      </div>
    `
  );

  const textInput = document.getElementById(`text-${taskId}`);
  textInput.focus();

  const createNewTaskUseCase = new CreateTaskUseCase(TaksLocalStorage);
  createNewTaskUseCase.execute({
    taskId,
    status: "pendente",
    description: "",
  });
});
