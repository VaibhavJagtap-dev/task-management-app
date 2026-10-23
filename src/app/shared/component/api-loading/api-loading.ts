import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-api-loading',
  styleUrl: './api-loading.scss',
  templateUrl: './api-loading.html',
})
export class ApiLoading {
  readonly message = input('Loading tasks...');
  readonly diameter = input(48);
}
