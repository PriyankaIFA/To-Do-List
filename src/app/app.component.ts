import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tasks: string[] = [];
  newTask: string = '';

  ngOnInit() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      const taskWithDateTime = `${this.newTask} - ${new Date().toLocaleString()}`;
      this.tasks.push(taskWithDateTime);
      this.newTask = '';
      this.updateLocalStorage();
    }
  }

  editTask(task: string) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      const editedTask = prompt('Edit Task', task);
      if (editedTask && editedTask.trim() !== '') {
        const updatedTask = `${editedTask} - ${new Date().toLocaleString()}`;
      this.tasks[index] = updatedTask;
      this.updateLocalStorage();
      }
    }
  }

  deleteTask(task: string) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
