export class EditTaskUseCase {
  taskLocalStorage;
  constructor(taskLocalStorage) {
    this.taskLocalStorage = new taskLocalStorage();
  }

  execute(props) {
    this.taskLocalStorage.edit(props);
  }
}
