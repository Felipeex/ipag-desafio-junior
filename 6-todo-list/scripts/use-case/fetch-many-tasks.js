export class fetchManyTasksUseCase {
  taskLocalStorage;
  constructor(taskLocalStorage) {
    this.taskLocalStorage = new taskLocalStorage();
  }

  execute(props) {
    return this.taskLocalStorage.getMany(props);
  }
}
