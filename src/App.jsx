import React from "react";
import { KanbanProvider } from "./context/KanbanContext.jsx";
import { Board } from "./components/Board.jsx";

export default function App() {
  return (
    <KanbanProvider>
      <Board />
    </KanbanProvider>
  );
}
