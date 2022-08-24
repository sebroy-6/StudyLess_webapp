export async function deleteTask(authToken, task) {
	const response = await fetch(`/api/task/${task._id}`, {
		method: "DELETE",
		headers: {
			"content-Type": "application/json",
			authentication: authToken,
		},
	});

	if (response.ok) {
		console.log(`task ${task._id} has been deleted`);
	} else {
		console.log(response.json);
	}
}

export async function updateTask(authToken, task) {
	const response = await fetch(`/api/task/${task._id}`, {
		method: "PATCH",
		body: JSON.stringify({ task: task }),
		headers: {
			"content-Type": "application/json",
			authentication: authToken,
		},
	});
	if (response.ok) {
		console.log(`task ${task._id} has been updated`);
	} else {
		console.log(response.json);
	}
}
