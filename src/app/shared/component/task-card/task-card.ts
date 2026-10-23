import { Component, computed, input, output } from '@angular/core';
import { Task } from '../../interfaces/tasks';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
  ],
  selector: 'app-task-card',
  styleUrl: './task-card.scss',
  templateUrl: './task-card.html',
})
export class TaskCard {
  task = input.required<Task>();

  delete = output<number>();

  isOverdue = computed(() => {
    const t = this.task();
    return t.status !== 'done' && new Date(t.dueDate) < new Date();
  });

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
