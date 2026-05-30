import React from "react";
import { useMemo, useState } from "react";
import { useKanban } from "../context/KanbanContext.jsx";
import { Column } from "./Column.jsx";
import { GanttView } from "./GanttView.jsx";
import { ProjectSidebar } from "./ProjectSidebar.jsx";
import { TaskModal } from "./TaskModal.jsx";
import { TimelineView } from "./TimelineView.jsx";
import { ViewTabs } from "./ViewTabs.jsx";
import { getAllTasks } from "../utils/tasks.js";

const emptyModalState = {
  mode: "add",
  columnId: null,
  task: null
};

export function Board() {
  const { columns, projects, tasks, addProject, addTask, editTask, deleteTask, moveTask } =
    useKanban();
  const [modalState, setModalState] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState("all");
  const [activeView, setActiveView] = useState("board");

  const allTasks = useMemo(() => getAllTasks(tasks, columns), [tasks, columns]);

  const visibleTasks = useMemo(
    () =>
      activeProjectId === "all"
        ? allTasks
        : allTasks.filter((task) => task.projectId === activeProjectId),
    [activeProjectId, allTasks]
  );

  const visibleTasksByColumn = useMemo(
    () =>
      columns.reduce((grouped, column) => {
        grouped[column.id] = tasks[column.id].filter(
          (task) => activeProjectId === "all" || task.projectId === activeProjectId
        );
        return grouped;
      }, {}),
    [activeProjectId, columns, tasks]
  );

  const completedCount = useMemo(
    () => visibleTasks.filter((task) => task.statusId === "done").length,
    [visibleTasks]
  );

  function openAddTask(columnId) {
    setModalState({ ...emptyModalState, mode: "add", columnId });
  }

  function openEditTask(columnId, task) {
    setModalState({ mode: "edit", columnId, task });
  }

  function closeModal() {
    setModalState(null);
  }

  function handleModalSubmit(values) {
    if (modalState.mode === "edit") {
      editTask(modalState.columnId, modalState.task.id, values);
    } else {
      addTask(modalState.columnId, values);
    }

    closeModal();
  }

  function handleDrop(targetColumnId) {
    if (!draggedTask) {
      return;
    }

    moveTask(draggedTask.columnId, targetColumnId, draggedTask.taskId);
    setDraggedTask(null);
  }

  return (
    <main className="workspace-shell">
      <ProjectSidebar
        projects={projects}
        tasks={allTasks}
        activeProjectId={activeProjectId}
        onProjectChange={setActiveProjectId}
        onAddProject={addProject}
      />

      <section className="app-shell">
        <header className="board-header">
          <div>
            <p className="eyebrow">Workspace</p>
            <h1>Project Command Center</h1>
          </div>
          <div className="metric-row">
            <div className="board-stats" aria-label={`${visibleTasks.length} visible tasks`}>
              <span>{visibleTasks.length}</span>
              <small>tasks</small>
            </div>
            <div className="board-stats" aria-label={`${completedCount} completed tasks`}>
              <span>{completedCount}</span>
              <small>done</small>
            </div>
          </div>
        </header>

        <div className="toolbar">
          <ViewTabs activeView={activeView} onViewChange={setActiveView} />
          <button type="button" className="primary-action" onClick={() => openAddTask("todo")}>
            Add Task
          </button>
        </div>

        {activeView === "board" && (
          <section className="board" aria-label="Kanban task board">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={visibleTasksByColumn[column.id]}
                projects={projects}
                isDragTarget={Boolean(draggedTask)}
                onAddTask={openAddTask}
                onEditTask={openEditTask}
                onDeleteTask={deleteTask}
                onDragStart={(taskId) => setDraggedTask({ columnId: column.id, taskId })}
                onDragEnd={() => setDraggedTask(null)}
                onDrop={handleDrop}
              />
            ))}
          </section>
        )}

        {activeView === "timeline" && <TimelineView tasks={visibleTasks} projects={projects} />}

        {activeView === "gantt" && <GanttView tasks={visibleTasks} projects={projects} />}
      </section>

      {modalState && (
        <TaskModal
          mode={modalState.mode}
          initialTask={modalState.task}
          projects={projects}
          defaultProjectId={activeProjectId === "all" ? projects[0]?.id : activeProjectId}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}
    </main>
  );
}
