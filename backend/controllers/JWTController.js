require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
	const authorizationHearder = req.headers.authentication;

	if (!authorizationHearder) {
		return res.status(401).json("No authentication token was provided");
	}

	const clientToken = authorizationHearder.split(" ").pop();

	try {
		const object = jwt.verify(clientToken, process.env.SECRET_JWT_KEY);
		req.user = object.user;
		next();
	} catch (error) {
		return res.status(403).json(error.message);
	}
}

module.exports = { authenticateJWT };
