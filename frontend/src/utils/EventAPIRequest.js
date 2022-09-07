// These functions can only be executed inside of a react component &
// necessite the dispatch object of the TaskContext

export const getEventsByDay = async (dispatch, date) => {
	const authToken = localStorage.getItem("authentication");
	const response = await fetch(`/api/event/${date}`, {
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

	const payload = { date: date, daysEvents: json };
	dispatch({ type: "SET_EVENTS_BY_DAY", payload: payload });
	return json;
};
