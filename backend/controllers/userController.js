const User = require("../models/userModel");

async function signupUser(req, res) {
    const { username, email, password } = req.body;
    
    try {
        const JWToken = await User.signup(username, email, password);
        res.status(200).json({authentication: JWToken});
    } 
    catch (error) {
        res.status(400).json(error.message);
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json("missing username and/or passord");
    }

    try {
        const JWToken = await User.login(username, password);
        res.status(200).json({authentication: JWToken});
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = { signupUser, loginUser };