import { Component, inject, OnInit, signal } from '@angular/core';
import { TasksApi } from '../../core/services/tasks-api';
import { Task } from '../../shared/interfaces/tasks';
import { TaskList } from '../../shared/component/task-list/task-list';
import { ApiLoading } from '../../shared/component/api-loading/api-loading';

@Component({
  imports: [TaskList, ApiLoading],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private tasksApi = inject(TasksApi);

  tasks = signal<Task[]>([]);

  isApiLoading = signal<boolean>(false);

  getTasks(showLoadingScreen: boolean = false) {
    this.isApiLoading.set(showLoadingScreen);
    this.tasksApi.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.isApiLoading.set(false);
      },
      error: (e) => {
        this.isApiLoading.set(false);
        console.log(e);
      },
    });
  }

  ngOnInit(): void {
    this.getTasks(true);
  }
}
