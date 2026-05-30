import React from "react";
import { useEffect, useId, useState } from "react";

export function TaskModal({ mode, initialTask, projects, defaultProjectId, onClose, onSubmit }) {
  const titleId = useId();
  const descriptionId = useId();
  const projectId = useId();
  const startDateId = useId();
  const endDateId = useId();
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(initialTask?.description ?? "");
  const [selectedProjectId, setSelectedProjectId] = useState(
    initialTask?.projectId ?? defaultProjectId
  );
  const [startDate, setStartDate] = useState(initialTask?.startDate ?? "2026-05-29");
  const [endDate, setEndDate] = useState(initialTask?.endDate ?? "2026-06-03");

  const isEditing = mode === "edit";
  const canSubmit = title.trim().length > 0;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    onSubmit({ title, description, projectId: selectedProjectId, startDate, endDate });
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="modal__header">
            <h2>{isEditing ? "Edit Task" : "Add Task"}</h2>
            <button type="button" className="icon-button" aria-label="Close" onClick={onClose}>
              x
            </button>
          </div>

          <label htmlFor={titleId}>Title</label>
          <input
            id={titleId}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Write a clear task title"
            autoFocus
          />

          <label htmlFor={descriptionId}>Description</label>
          <textarea
            id={descriptionId}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add optional details"
            rows="4"
          />

          <div className="modal-grid">
            <div>
              <label htmlFor={projectId}>Project</label>
              <select
                id={projectId}
                value={selectedProjectId}
                onChange={(event) => setSelectedProjectId(event.target.value)}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={startDateId}>Start</label>
              <input
                id={startDateId}
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor={endDateId}>End</label>
              <input
                id={endDateId}
                type="date"
                min={startDate}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>

          <div className="modal__actions">
            <button type="button" className="secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={!canSubmit}>
              {isEditing ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
