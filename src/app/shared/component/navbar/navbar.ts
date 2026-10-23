import { Component, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { isActive, Router, RouterLink } from '@angular/router';

@Component({
  imports: [MatButtonModule, RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {
  private router = inject(Router);

  protected readonly isTasksPage: Signal<boolean> = isActive('/tasks', this.router, {
    paths: 'exact',
  });
}
