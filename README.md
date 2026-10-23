# Task Management Application

A task management app built with Angular. Browse and organize tasks by status and priority, search by title, and create, edit, or delete tasks.

## Features

- View tasks with their descriptions, statuses, priorities, and due dates.
- Search tasks by title and filter by status or priority.
- Navigate task results with pagination.
- Create tasks and edit existing tasks using a shared form.
- Delete tasks after confirming the action.
- See overdue indicators for tasks that are not complete.
- Use a seeded mock task collection through an in-memory API.
- Build the interface with Angular Material components.

> **Note:** The in-memory database is for development and demonstration. Changes are not persisted after the application restarts or the page is reloaded.

## Getting started

### Requirements

- Node.js
- npm

### Install and run

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser. The development server reloads when source files change.

## Project structure

```text
src/
├── app/
│   ├── core/
│   │   ├── data/             # Seeded mock task data
│   │   └── services/         # In-memory database and task API service
│   ├── pages/
│   │   ├── create-task/      # Create-task page
│   │   ├── edit-task/        # Edit-task page
│   │   ├── home/             # Task list page
│   │   └── not-found/        # Unknown-route page
│   ├── shared/
│   │   ├── component/        # Navbar, task list/cards, forms, and dialogs
│   │   ├── interfaces/       # Shared TypeScript interfaces
│   │   └── enums.ts          # Task status and priority values
│   ├── app.routes.ts         # Application routes
│   └── app.config.ts         # Router and in-memory API configuration
├── main.ts
└── styles.scss
```

The task API service is the app's interface to the in-memory database. The main routes are `/tasks`, `/tasks/new`, and `/tasks/:id/edit`.

## Development process

I approached the project incrementally, establishing the data model and service layer before building the user-facing workflows:

1. **Set up the foundation:** Created the Angular application and configured an in-memory API to provide a backend-like development environment.
2. **Established the task model:** Prepared representative sample tasks, then defined TypeScript interfaces and enums to give task data a consistent structure.
3. **Separated data access:** Built a task API service to centralize operations against the in-memory API, keeping page components independent of its implementation.
4. **Implemented the core experience:** Created the task-list home page, followed by dedicated create and edit routes.
5. **Built reusable forms and UI:** Added Angular Material and shared a task form between the create and edit workflows.
6. **Added discovery and navigation:** Implemented title search, status and priority filters, and pagination to make the task list easier to use.
7. **Refined key workflows:** Added loading and error handling, overdue indicators, and a confirmation dialog to prevent accidental deletion.
8. **Validated and iterated:** Added unit tests for key services and components, and refined the app based on the results.

## Technology

- Angular
- TypeScript
- Angular Material
- Angular In-Memory Web API
