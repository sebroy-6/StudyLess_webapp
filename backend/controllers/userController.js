const { hash, compare } = require("bcrypt");
const User = require("../models/userModel");

async function signupUser(req, res) {
    const { username, email, password } = req.body;
    
    try {
        const newUser = await User.signup(username, email, password);
        res.status(200).json(newUser);
    } 
    catch (error) {
        res.status(400).json(error.message);
    }
}


async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);

        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = { signupUser, loginUser };