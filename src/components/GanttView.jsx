import React, { useMemo } from "react";
import { formatShortDate, getDaysBetween, getProjectById } from "../utils/tasks.js";

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toDate(value) {
  return new Date(`${value}T00:00:00`);
}

export function GanttView({ tasks, projects }) {
  const chart = useMemo(() => {
    if (tasks.length === 0) {
      return { start: new Date(), days: [] };
    }

    const starts = tasks.map((task) => toDate(task.startDate));
    const ends = tasks.map((task) => toDate(task.endDate));
    const start = new Date(Math.min(...starts));
    const end = new Date(Math.max(...ends));
    const totalDays = getDaysBetween(start.toISOString().slice(0, 10), end.toISOString().slice(0, 10));
    const days = Array.from({ length: totalDays }, (_, index) => addDays(start, index));

    return { start, days };
  }, [tasks]);

  if (tasks.length === 0) {
    return <p className="empty-state">No scheduled tasks for this project.</p>;
  }

  return (
    <section className="gantt-view" aria-label="Gantt chart">
      <div
        className="gantt-grid"
        style={{ "--day-count": chart.days.length }}
      >
        <div className="gantt-corner">Task</div>
        {chart.days.map((day) => (
          <div className="gantt-day" key={day.toISOString()}>
            {formatShortDate(day.toISOString().slice(0, 10))}
          </div>
        ))}

        {tasks.map((task) => {
          const project = getProjectById(projects, task.projectId);
          const offset = getDaysBetween(
            chart.start.toISOString().slice(0, 10),
            task.startDate
          );
          const span = getDaysBetween(task.startDate, task.endDate);

          return (
            <React.Fragment key={`${task.statusId}-${task.id}`}>
              <div className="gantt-task-label">
                <strong>{task.title}</strong>
                <small>{project.name}</small>
              </div>
              <div className="gantt-track">
                <span
                  className="gantt-bar"
                  style={{
                    "--bar-start": offset,
                    "--bar-span": span,
                    "--project-color": project.color
                  }}
                >
                  {task.statusTitle}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
