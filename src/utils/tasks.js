export function getAllTasks(tasksByColumn, columns) {
  return columns.flatMap((column) =>
    tasksByColumn[column.id].map((task) => ({
      ...task,
      statusId: column.id,
      statusTitle: column.title
    }))
  );
}

export function getProjectById(projects, projectId) {
  return projects.find((project) => project.id === projectId) ?? projects[0];
}

export function formatShortDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

export function getDaysBetween(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const dayMs = 1000 * 60 * 60 * 24;

  return Math.max(1, Math.round((end - start) / dayMs) + 1);
}
