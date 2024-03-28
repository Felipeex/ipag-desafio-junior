export class TaksLocalStorage {
  constructor() {
    const isExistTasks = localStorage.getItem("tasks") || null;
    if (!isExistTasks) localStorage.setItem("tasks", "null");
  }

  getMany() {
    const getAllTasks = this.parse(localStorage.getItem("tasks"));
    if (!getAllTasks) return [];

    return getAllTasks;
  }
  create(props) {
    const allTasks = this.getMany();
    allTasks.push(props);

    localStorage.setItem("tasks", this.compose(allTasks));
  }

  delete() {}

  compose(tasks) {
    return JSON.stringify(tasks);
  }

  parse(tasks) {
    return JSON.parse(tasks);
  }
}
