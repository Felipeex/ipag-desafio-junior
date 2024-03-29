export class TaksLocalStorage {
  constructor() {
    const isExistTasks = localStorage.getItem("tasks") || null;
    if (!isExistTasks) localStorage.setItem("tasks", "null");
  }

  getMany() {
    const getAllTasks = this.parse(localStorage.getItem("tasks"));
    if (!getAllTasks) return [];

    return getAllTasks.sort((a, b) => {
      if (a.taskId > b.taskId) {
        return 0;
      } else {
        return -1;
      }
    });
  }

  getById(id) {
    const allTasks = this.getMany();
    const task = allTasks.find((task) => task.taskId === id);

    if (!task) return null;
    return task;
  }

  create(props) {
    const allTasks = this.getMany();
    allTasks.push(props);

    localStorage.setItem("tasks", this.compose(allTasks));
  }

  edit(props) {
    const allTasks = this.getMany();
    const filteredTasks = allTasks.filter(
      (task) => task.taskId !== props.taskId
    );

    filteredTasks.push(props);
    localStorage.setItem("tasks", this.compose(filteredTasks));
  }

  delete(id) {
    const allTasks = this.getMany();
    const filteredTasks = allTasks.filter((task) => task.taskId !== id);

    localStorage.setItem("tasks", this.compose(filteredTasks));
  }

  compose(tasks) {
    return JSON.stringify(tasks);
  }

  parse(tasks) {
    return JSON.parse(tasks);
  }
}
