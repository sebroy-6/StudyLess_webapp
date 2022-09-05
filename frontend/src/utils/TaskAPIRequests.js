// These functions can only be executed inside of a react component &
// necessite the dispatch object of the TaskContext

export const getTasks = async (dispatch) => {
	const authToken = localStorage.getItem("authentication");
	const response = await fetch("/api/task", {
		method: "GET",
		headers: {
			authentication: authToken,
		},
	});
	const json = await response.json();

	if (!response.ok) {
		console.log(response.json);
		if (response.status === 403) {
			localStorage.removeItem("authentication");
			return (window.location = "/login");
		}
	}
	dispatch({ type: "SET_TASKS", payload: json });
	return json;
};

export async function deleteTask(dispatch, task) {
	const authToken = localStorage.getItem("authentication");
	const response = await fetch(`/api/task/${task._id}`, {
		method: "DELETE",
		headers: {
			"content-Type": "application/json",
			authentication: authToken,
		},
	});

	if (!response.ok) {
		console.log(response.json);
		if (response.status === 403) {
			localStorage.removeItem("authentication");
			return (window.location = "/login");
		}
	}
	console.log(`task ${task._id} has been deleted`);
	dispatch({ type: "REMOVE_TASK", payload: task });
}

export async function updateTask(dispatch, oldTask, newTask) {
	dispatch({ type: "REMOVE_TASK", payload: oldTask }); // does the context update before and corrects it (if need be)
	dispatch({ type: "ADD_TASK", payload: newTask }); // after to prioritize speed of context update and avoid screen flicker
	const authToken = localStorage.getItem("authentication");
	const response = await fetch(`/api/task/${oldTask._id}`, {
		method: "PATCH",
		body: JSON.stringify({ task: newTask }),
		headers: {
			"content-Type": "application/json",
			authentication: authToken,
		},
	});

	if (!response.ok) {
		console.log(response.json);
		if (response.status === 403) {
			localStorage.removeItem("authentication");
			return (window.location = "/login");
		}
	}
	dispatch({ type: "REMOVE_TASK", payload: newTask });
	dispatch({ type: "ADD_TASK", payload: oldTask });
	console.log(`task ${oldTask._id} has been updated`);
}
