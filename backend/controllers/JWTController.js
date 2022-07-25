require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
    const authorizationHearder = req.body.authorisation;

    if (!authorizationHearder) {
        return res.status(401).json("authorisation header was not found (for JWT authentication)");
    }

    const clientToken = authorizationHearder.split(" ").pop();

    try {
        const object = jwt.verify(clientToken, process.env.SECRET_JWT_KEY);
        req.user = object.user;    // so we can identify who is the user 
        next();
    }
    catch(error) {
        return res.status(403).json(error.message);
    }
}

module.exports = { authenticateJWT };