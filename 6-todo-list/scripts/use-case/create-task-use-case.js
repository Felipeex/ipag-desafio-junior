export class CreateTaskUseCase {
  taskLocalStorage;
  constructor(taskLocalStorage) {
    this.taskLocalStorage = new taskLocalStorage();
  }

  execute(props) {
    this.taskLocalStorage.create(props);
  }
}
