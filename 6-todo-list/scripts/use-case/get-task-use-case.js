export class getTaskUseCase {
  taskLocalStorage;
  constructor(taskLocalStorage) {
    this.taskLocalStorage = new taskLocalStorage();
  }

  execute(id) {
    return this.taskLocalStorage.getById(id);
  }
}
