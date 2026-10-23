import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';
import { Home } from './pages/home/home';
import { EditTask } from './pages/edit-task/edit-task';
import { CreateTask } from './pages/create-task/create-task';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: Home },
  { path: 'tasks/new', component: CreateTask },
  { path: 'tasks/:id/edit', component: EditTask },
  { path: '**', component: NotFound },
];
