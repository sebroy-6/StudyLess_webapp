// get the data from a json file and store it in a variable
const fs = require('fs');
const userJsonPath = "./app/data/users.json";
const userDataPath = "./app/data/user_data/";

function getData(fileName = userJsonPath) {
    let data = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(data);
}

// Section related to USERS

function getUser(username) {
    return getData(userJsonPath).find(user => user.username === username);
}

function addUser(username, password) {
    let users = getData(userJsonPath);
    let user = { username: username, password: password };
    if (getUser(username) === undefined){
        users.push(user);
        fs.writeFileSync(userJsonPath, JSON.stringify(users));
        console.log(user.username + " has been added to the database");

        createNewUserFiles(username);
        return user;
    }
    console.log(`The user ${username} already exists`);
    return user;
}

module.exports = { getUser, addUser };


// Section related to USER_DATA


function createNewUserFiles(username) {
    if (!fs.existsSync(userDataPath + username)) {
        fs.mkdirSync(userDataPath + username);
    }
}
