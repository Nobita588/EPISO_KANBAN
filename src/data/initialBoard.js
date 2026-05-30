export const initialColumns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" }
];

export const initialProjects = [
  {
    id: "project-alpha",
    name: "Website Redesign",
    color: "#0f766e",
    dueDate: "2026-06-12"
  },
  {
    id: "project-orbit",
    name: "Mobile Launch",
    color: "#7c3aed",
    dueDate: "2026-06-20"
  },
  {
    id: "project-slate",
    name: "Operations Sprint",
    color: "#d97706",
    dueDate: "2026-06-08"
  }
];

export const initialTasks = {
  todo: [
    {
      id: "task-1",
      title: "Create project structure",
      description: "Set up reusable React components and shared state.",
      projectId: "project-alpha",
      startDate: "2026-05-29",
      endDate: "2026-06-01"
    },
    {
      id: "task-2",
      title: "Design responsive board",
      description: "Make columns readable on desktop and mobile screens.",
      projectId: "project-orbit",
      startDate: "2026-06-02",
      endDate: "2026-06-06"
    }
  ],
  "in-progress": [
    {
      id: "task-3",
      title: "Implement drag and drop",
      description: "Move tasks cleanly between workflow columns.",
      projectId: "project-alpha",
      startDate: "2026-06-03",
      endDate: "2026-06-08"
    }
  ],
  done: [
    {
      id: "task-4",
      title: "Prepare mock data",
      description: "Seed the board with realistic starter tasks.",
      projectId: "project-slate",
      startDate: "2026-05-27",
      endDate: "2026-05-29"
    }
  ]
};
