import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TaskContextProvider } from "./contexts/TasksContext.jsx";
import { EventContextProvider } from "./contexts/EventsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<TaskContextProvider>
			<EventContextProvider>
				<App />
			</EventContextProvider>
		</TaskContextProvider>
	</React.StrictMode>
);
