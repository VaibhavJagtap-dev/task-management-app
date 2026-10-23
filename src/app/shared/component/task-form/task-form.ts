import { Component, effect, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskPriority, TaskStatus } from '../../enums';
import { Task } from '../../interfaces/tasks';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';

export interface TaskFormValue {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  selector: 'app-task-form',
  styleUrl: './task-form.scss',
  templateUrl: './task-form.html',
  providers: [provideNativeDateAdapter()],
})
export class TaskForm {
  private fb = inject(NonNullableFormBuilder);
  task = input<Task | null>(null);
  saving = input(false);
  submitted = output<TaskFormValue>();
  cancelled = output<void>();

  statuses = Object.values(TaskStatus);
  priorities = Object.values(TaskPriority);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', Validators.required],
    status: this.fb.control<TaskStatus>(TaskStatus.TODO, Validators.required),
    priority: this.fb.control<TaskPriority>(TaskPriority.MEDIUM, Validators.required),
    dueDate: this.fb.control<Date | null>(null, Validators.required),
  });

  constructor() {
    effect(() => {
      const t = this.task();
      if (t) {
        this.form.patchValue({
          ...t,
          description: t.description ?? '',
          dueDate: new Date(t.dueDate),
        });
      }
    });
  }

  private toDateString(d: Date): string {
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { dueDate, ...rest } = this.form.getRawValue();
    this.submitted.emit({ ...rest, dueDate: this.toDateString(dueDate!) });
  }
}
