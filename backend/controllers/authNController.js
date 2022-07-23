const { hash, compare } = require("bcrypt");
const User = require("../models/user");

async function signIn(req, res) {
    if (await User.findOne({ username: req.body.uname })){
        res.render("signIn", { errorMsg : "This user already exists" });
    } 
    else {
        if (req.body.uname !== "" && req.body.psw !== "") {
            const hashedPassword = (await hash(req.body.psw, 10)).toString();
            let newUser = new User({
                username: req.body.uname,
                password: hashedPassword,
            });
            newUser.save();
            res.render("signIn");
        }
        else
            res.render("signIn", { errorMsg : "please enter a username and password"});
    }
}


async function logIn(req, res) {
    let user = await User.findOne({ username: req.body.uname });
    if (user){
        if (await compare(req.body.psw, user.password)) {
            req.session.userid = req.body.uname;
            res.redirect("/homePage");
        }
        else res.render("signIn", { errorMsg : "Incorrect password, please try again"});
    }
    else res.render("signIn", { errorMsg : "This user does not exist" });
}

module.exports = { signIn, logIn };