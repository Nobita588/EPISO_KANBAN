import React from "react";
import { formatShortDate, getProjectById } from "../utils/tasks.js";

export function TimelineView({ tasks, projects }) {
  const sortedTasks = [...tasks].sort(
    (first, second) => new Date(first.startDate) - new Date(second.startDate)
  );

  return (
    <section className="timeline-view" aria-label="Project timeline">
      {sortedTasks.map((task) => {
        const project = getProjectById(projects, task.projectId);

        return (
          <article className="timeline-item" key={`${task.statusId}-${task.id}`}>
            <div className="timeline-date">
              <strong>{formatShortDate(task.startDate)}</strong>
              <span>{formatShortDate(task.endDate)}</span>
            </div>
            <div className="timeline-line" style={{ "--project-color": project.color }} />
            <div className="timeline-card">
              <div className="task-card__title-row">
                <h3>{task.title}</h3>
                <span className="status-pill">{task.statusTitle}</span>
              </div>
              <p>{task.description}</p>
              <small style={{ color: project.color }}>{project.name}</small>
            </div>
          </article>
        );
      })}
    </section>
  );
}
