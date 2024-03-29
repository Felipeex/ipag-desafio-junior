export class DeleteTaskUseCase {
  taskLocalStorage;
  constructor(taskLocalStorage) {
    this.taskLocalStorage = new taskLocalStorage();
  }

  execute(props) {
    this.taskLocalStorage.delete(props);
  }
}
