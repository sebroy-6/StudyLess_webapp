const mongoose = require("mongoose");

const USER_SCHEMA = mongoose.Schema({ 
    username: String, 
    password: String, 
    appSettings: {
        timerSettings: {    // all the times here will be in seconds
            studyTime: Number,
            breakTime: Number,
            timeoutTime: Number
        },
    }
});
const User = mongoose.model("user", USER_SCHEMA, "users");
USER_SCHEMA.post("save", () => {
    console.log(`new user was added to the database at ${Date().split(" ")[4]}`);
});


const DATA_TYPES = {
    "user" : User
}


function getModel(model) {
    if (typeof(model) === "string") {
        if (model in DATA_TYPES) {
            return DATA_TYPES[model];
        }
    }
    else {
        console.log("requested model could not be found");
    }
}

module.exports = { getModel };