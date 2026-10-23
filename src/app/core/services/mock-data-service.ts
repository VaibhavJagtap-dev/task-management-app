import { Service } from '@angular/core';
import { mockData } from '../data/mock-data';

@Service()
export class MockDataService {
  createDb() {
    // The key 'tasks' determines the API endpoint (/api/tasks)
    return { tasks: mockData };
  }
}
