import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../shared/interfaces/tasks';

@Service()
export class TasksApi {
  private apiUrl = 'api/tasks';
  private http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.apiUrl, task);
  }

  deleteTask(id: number): Observable<void> {
    console.log(`${this.apiUrl}/${id}`);

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
