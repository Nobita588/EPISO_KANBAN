import React, { createContext, useContext, useMemo, useReducer } from "react";
import { initialColumns, initialProjects, initialTasks } from "../data/initialBoard.js";

const KanbanContext = createContext(null);

function createTaskId() {
  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createProjectId() {
  return `project-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function kanbanReducer(state, action) {
  switch (action.type) {
    case "ADD_PROJECT": {
      const palette = ["#0f766e", "#7c3aed", "#d97706", "#2563eb", "#be123c"];
      const project = {
        id: createProjectId(),
        name: action.payload.name.trim(),
        color: palette[state.projects.length % palette.length],
        dueDate: action.payload.dueDate
      };

      return {
        ...state,
        projects: [...state.projects, project]
      };
    }

    case "ADD_TASK": {
      const task = {
        id: createTaskId(),
        title: action.payload.title.trim(),
        description: action.payload.description.trim(),
        projectId: action.payload.projectId,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate
      };

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.columnId]: [...state.tasks[action.payload.columnId], task]
        }
      };
    }

    case "EDIT_TASK": {
      const { columnId, taskId, title, description, projectId, startDate, endDate } =
        action.payload;

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [columnId]: state.tasks[columnId].map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  title: title.trim(),
                  description: description.trim(),
                  projectId,
                  startDate,
                  endDate
                }
              : task
          )
        }
      };
    }

    case "DELETE_TASK": {
      const { columnId, taskId } = action.payload;

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [columnId]: state.tasks[columnId].filter((task) => task.id !== taskId)
        }
      };
    }

    case "MOVE_TASK": {
      const { sourceColumnId, targetColumnId, taskId } = action.payload;

      if (sourceColumnId === targetColumnId) {
        return state;
      }

      const taskToMove = state.tasks[sourceColumnId].find((task) => task.id === taskId);

      if (!taskToMove) {
        return state;
      }

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [sourceColumnId]: state.tasks[sourceColumnId].filter((task) => task.id !== taskId),
          [targetColumnId]: [...state.tasks[targetColumnId], taskToMove]
        }
      };
    }

    default:
      return state;
  }
}

export function KanbanProvider({ children }) {
  const [state, dispatch] = useReducer(kanbanReducer, {
    columns: initialColumns,
    projects: initialProjects,
    tasks: initialTasks
  });

  const value = useMemo(
    () => ({
      columns: state.columns,
      projects: state.projects,
      tasks: state.tasks,
      addProject: (project) => dispatch({ type: "ADD_PROJECT", payload: project }),
      addTask: (columnId, task) =>
        dispatch({ type: "ADD_TASK", payload: { columnId, ...task } }),
      editTask: (columnId, taskId, task) =>
        dispatch({ type: "EDIT_TASK", payload: { columnId, taskId, ...task } }),
      deleteTask: (columnId, taskId) =>
        dispatch({ type: "DELETE_TASK", payload: { columnId, taskId } }),
      moveTask: (sourceColumnId, targetColumnId, taskId) =>
        dispatch({ type: "MOVE_TASK", payload: { sourceColumnId, targetColumnId, taskId } })
    }),
    [state]
  );

  return <KanbanContext.Provider value={value}>{children}</KanbanContext.Provider>;
}

export function useKanban() {
  const context = useContext(KanbanContext);

  if (!context) {
    throw new Error("useKanban must be used within a KanbanProvider");
  }

  return context;
}
