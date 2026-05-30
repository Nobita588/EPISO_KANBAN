import React from "react";
import { getProjectById } from "../utils/tasks.js";

export function TaskCard({
  task,
  projects,
  isDone = false,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd
}) {
  const project = getProjectById(projects, task.projectId);

  return (
    <div
      className={`task-card ${isDone ? "task-card--done" : ""}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="task-card__content">
        <div className="task-card__title-row">
          <h3>{task.title}</h3>
          {isDone && <span className="done-badge">Done</span>}
        </div>
        {task.description && <p>{task.description}</p>}
        <div className="task-meta">
          <span style={{ "--project-color": project.color }}>{project.name}</span>
          <small>
            {task.startDate} to {task.endDate}
          </small>
        </div>
      </div>

      <div className="task-card__actions">
        <button type="button" onClick={onEdit}>
          Edit
        </button>
        <button type="button" className="danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
