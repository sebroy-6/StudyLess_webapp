import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TaskContextProvider } from "./contexts/TasksContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<TaskContextProvider>
			<App />
		</TaskContextProvider>
	</React.StrictMode>
);
