const User = require("../models/user.model");

async function createUser(user) {
    return await User.create(user);
}

async function findUserByEmail(email) {
    return await User.findOne({ email });
}

async function logoutUser() {
    return await User.findOne({ email });
}

module.exports = {
    createUser,
    findUserByEmail,
    logoutUser
};