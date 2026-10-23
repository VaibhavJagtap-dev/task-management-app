import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskForm, TaskFormValue } from '../../shared/component/task-form/task-form';
import { TasksApi } from '../../core/services/tasks-api';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, TaskForm],
  selector: 'app-create-task',
  styleUrl: './create-task.scss',
  templateUrl: './create-task.html',
})
export class CreateTask {
  private tasksApi = inject(TasksApi);
  private router = inject(Router);

  saving = signal<boolean>(false);

  navigateHome() {
    this.router.navigate(['/tasks']);
  }

  onSubmitted(e: TaskFormValue) {
    this.saving.set(true);
    this.tasksApi
      .addTask({
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
          console.log(e);
          this.saving.set(false);
        },
      });
  }

  onCancelled() {
    this.navigateHome();
  }
}
