function reqError(message = "", status = 400, hasErrorPrefix = true) {
	let error;
	if (hasErrorPrefix) {
		error = new Error("ERROR! " + message);
	} else {
		error = new Error(message);
	}
	error.status = status;
	return error;
}

module.exports = { reqError };
