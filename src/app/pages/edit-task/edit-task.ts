import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskFormValue, TaskForm } from '../../shared/component/task-form/task-form';
import { TasksApi } from '../../core/services/tasks-api';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../shared/interfaces/tasks';
import { ApiLoading } from '../../shared/component/api-loading/api-loading';

@Component({
  imports: [TaskForm, ApiLoading],
  selector: 'app-edit-task',
  styleUrl: './edit-task.scss',
  templateUrl: './edit-task.html',
})
export class EditTask implements OnInit {
  private tasksApi = inject(TasksApi);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  task = signal<Task | null>(null);
  id = signal<number | null>(null);
  saving = signal<boolean>(false);

  isApiloading = signal<boolean>(false);

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    if (rawId) {
      this.id.set(parseInt(rawId));
      this.getTask();
    }
  }

  navigateHome() {
    this.router.navigate(['/tasks']);
  }

  onSubmitted(e: TaskFormValue) {
    const id = this.id();
    if (!id) {
      console.log('Id not there');
      return;
    }
    this.saving.set(true);
    this.tasksApi
      .editTask({
        id,
        title: e.title,
        description: e.description,
        status: e.status,
        priority: e.priority,
        dueDate: e.dueDate,
      })
      .subscribe({
        next: () => {
          this.navigateHome();
        },
        error: (e) => {
          this.saving.set(false);
          console.log(e);
        },
      });
  }

  getTask() {
    const id = this.id();
    if (!id) {
      console.log('Id not there');
      return;
    }

    this.isApiloading.set(true);
    this.tasksApi.getTask(id).subscribe({
      next: (task) => {
        this.task.set(task);
        this.isApiloading.set(false);
      },
      error: (e) => {
        console.log(e);
        this.isApiloading.set(false);
      },
    });
  }

  onCancelled() {
    this.navigateHome();
  }
}
