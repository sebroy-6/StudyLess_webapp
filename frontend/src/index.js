import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TaskContextProvider } from "./contexts/TasksContext.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<TaskContextProvider>
		<DndProvider backend={HTML5Backend}>
			<App />
		</DndProvider>
	</TaskContextProvider>
);
