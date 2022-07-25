require("dotenv").config();
const mongoose = require("mongoose");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWTLifeTime = "6h";

const UserSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true });


UserSchema.statics.signup = async function(username, email, password) { 
    if (await this.findOne({ username })) {
        throw Error("This username is taken");
    }
    if (await this.findOne({ email })) {
        throw Error("This email adress is taken");
    }
    if (!username || !email || !password) {
        throw Error("Some text fields have not been filled");
    }

    const hashedPassword = (await hash(password, 10)).toString();
    let user = await this.create({ username, email, password: hashedPassword}).toJson();
    user.password = undefined;
    user.email = undefined;
    console.log(user);
    const token = jwt.sign({ user }, process.env.SECRET_JWT_KEY, { expiresIn: JWTLifeTime });
    
    return token;
}

UserSchema.statics.login = async function(username, password) { 
    let user = await this.findOne({ username });
    if (!user){
        throw Error("This user does not exist");
    }
    else {
        if (!(await compare(password, user.password))) {
            throw Error("Incorrect password for this username");
        }
    }
    user.password = undefined;
    user.email = undefined;
    const token = jwt.sign({ user }, process.env.SECRET_JWT_KEY, { expiresIn: JWTLifeTime });

    return token;
}


module.exports = mongoose.model("User", UserSchema);