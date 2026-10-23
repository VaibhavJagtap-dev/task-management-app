import { Component, computed, debounced, inject, input, output, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Task } from '../../interfaces/tasks';
import { TaskCard } from '../task-card/task-card';
import { MatIcon } from '@angular/material/icon';
import { TaskStatus, TaskPriority } from '../../enums';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TasksApi } from '../../../core/services/tasks-api';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  imports: [
    CommonModule,
    MatPaginatorModule,
    TaskCard,
    MatIcon,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAnchor,
    RouterLink,
  ],
  selector: 'app-task-list',
  styleUrl: './task-list.scss',
  templateUrl: './task-list.html',
})
export class TaskList {
  private tasksApi = inject(TasksApi);
  private dialog = inject(MatDialog);
  tasks = input.required<Task[]>();

  refereshApi = output<void>();

  searchTerm = signal('');
  statusFilter = signal<TaskStatus | 'all'>('all');
  priorityFilter = signal<TaskPriority | 'all'>('all');

  statusValues = ['all', ...Object.values(TaskStatus)];
  priorityValues = ['all', ...Object.values(TaskPriority)];

  private debouncedSearch = debounced(this.searchTerm, 300);

  filteredTasks = computed<Task[]>(() =>
    this.tasks().filter((task) => {
      const term = this.debouncedSearch.value().toLowerCase();
      console.log(term, '--', task.title.toLowerCase());

      return (
        (this.statusFilter() === 'all' || task.status === this.statusFilter()) &&
        (this.priorityFilter() === 'all' || task.priority === this.priorityFilter()) &&
        task.title.toLowerCase().includes(term)
      );
    }),
  );

  pageIndex = signal(0);
  pageSize = signal(6);

  pagedTasks = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.filteredTasks().slice(start, start + this.pageSize());
  });

  onPage(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }

  onSearchTermChange(e: Event) {
    this.searchTerm.set((e.target as HTMLInputElement).value);
    this.pageIndex.set(0);
  }

  onStatusChange(e: Event) {
    this.statusFilter.set((e.target as HTMLInputElement).value as TaskStatus);
    this.pageIndex.set(0);
  }

  onPriortyChange(e: Event) {
    this.priorityFilter.set((e.target as HTMLInputElement).value as TaskPriority);
    this.pageIndex.set(0);
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { title: `Do you want to delete task with ID: ${id}` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.tasksApi.deleteTask(id).subscribe({
          next: () => {
            console.log(`Deleted task ID: ${id}`);
            this.refereshApi.emit();
          },
          error: (e) => console.log(e),
        });
      }
    });
  }

  clear() {
    this.searchTerm.set('');
    this.pageIndex.set(0);
  }
}
