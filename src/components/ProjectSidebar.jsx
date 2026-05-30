import React, { useMemo, useState } from "react";

export function ProjectSidebar({
  projects,
  tasks,
  activeProjectId,
  onProjectChange,
  onAddProject
}) {
  const [projectName, setProjectName] = useState("");
  const [dueDate, setDueDate] = useState("2026-06-30");

  const taskCounts = useMemo(() => {
    return tasks.reduce((counts, task) => {
      counts[task.projectId] = (counts[task.projectId] ?? 0) + 1;
      return counts;
    }, {});
  }, [tasks]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!projectName.trim()) {
      return;
    }

    onAddProject({ name: projectName, dueDate });
    setProjectName("");
  }

  return (
    <aside className="project-sidebar" aria-label="Projects">
      <div className="brand-lockup">
        <span className="brand-mark">K</span>
        <div>
          <strong>KanFlow</strong>
          <small>Project workspace</small>
        </div>
      </div>

      <nav className="project-list" aria-label="Project filters">
        <button
          type="button"
          className={`project-item ${activeProjectId === "all" ? "project-item--active" : ""}`}
          onClick={() => onProjectChange("all")}
        >
          <span className="project-dot project-dot--all" />
          <span>All Projects</span>
          <small>{tasks.length}</small>
        </button>

        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={`project-item ${
              activeProjectId === project.id ? "project-item--active" : ""
            }`}
            onClick={() => onProjectChange(project.id)}
          >
            <span className="project-dot" style={{ background: project.color }} />
            <span>{project.name}</span>
            <small>{taskCounts[project.id] ?? 0}</small>
          </button>
        ))}
      </nav>

      <form className="quick-project-form" onSubmit={handleSubmit}>
        <label htmlFor="project-name">New project</label>
        <input
          id="project-name"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          placeholder="Project name"
        />
        <input
          aria-label="Project due date"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
        <button type="submit">Add Project</button>
      </form>
    </aside>
  );
}
