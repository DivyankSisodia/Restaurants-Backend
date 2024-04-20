const User = require("../models/user");

async function createUser(user) {
    return await User.create(user);
}

async function findUserByEmail(email) {
    return await User.findOne({ email });
}

module.exports = {
    createUser,
    findUserByEmail,
};