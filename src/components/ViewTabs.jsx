import React from "react";

const views = [
  { id: "board", label: "Board" },
  { id: "timeline", label: "Timeline" },
  { id: "gantt", label: "Gantt" }
];

export function ViewTabs({ activeView, onViewChange }) {
  return (
    <div className="view-tabs" role="tablist" aria-label="Workspace views">
      {views.map((view) => (
        <button
          key={view.id}
          type="button"
          role="tab"
          aria-selected={activeView === view.id}
          className={activeView === view.id ? "view-tab view-tab--active" : "view-tab"}
          onClick={() => onViewChange(view.id)}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}
