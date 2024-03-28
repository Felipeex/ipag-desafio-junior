const addTaskButton = document.getElementsByClassName("add-task")[0];
const taskList = document.getElementsByClassName("tasks")[0];

addTaskButton.addEventListener("click", () => {
  const inputId = new Date().getTime();
  taskList.insertAdjacentHTML(
    "beforeBegin",
    `
      <div class="task">
        <input id="checkbox-${inputId}"type="checkbox" />
        <input id="text-${inputId}" type="text" placeholder="Digite uma tarefa..." />
      </div>
    `
  );

  const textInput = document.getElementById(`text-${inputId}`);
  textInput.focus();
});
