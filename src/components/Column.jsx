import React from "react";
import { TaskCard } from "./TaskCard.jsx";

export function Column({
  column,
  tasks,
  projects,
  isDragTarget,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragEnd,
  onDrop
}) {
  function handleDragOver(event) {
    event.preventDefault();
  }

  return (
    <article
      className={`column ${isDragTarget ? "column--active-drop" : ""}`}
      onDragOver={handleDragOver}
      onDrop={() => onDrop(column.id)}
    >
      <div className="column__header">
        <div>
          <h2>{column.title}</h2>
          <span>{tasks.length} tasks</span>
        </div>
        <button
          className="icon-button"
          type="button"
          aria-label={`Add task to ${column.title}`}
          title={`Add task to ${column.title}`}
          onClick={() => onAddTask(column.id)}
        >
          +
        </button>
      </div>

      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              projects={projects}
              isDone={column.id === "done"}
              onEdit={() => onEditTask(column.id, task)}
              onDelete={() => onDeleteTask(column.id, task.id)}
              onDragStart={() => onDragStart(task.id)}
              onDragEnd={onDragEnd}
            />
          ))
        ) : (
          <p className="empty-state">Drop a task here or add a new one.</p>
        )}
      </div>
    </article>
  );
}
