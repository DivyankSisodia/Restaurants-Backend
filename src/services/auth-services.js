// userService.js

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const userRepository = require("../repository/auth-repository");

async function registerUser(userData) {
    try {
        // here we will collect the email and password from the userData object
        const { email, password } = userData;
        const existingUser = await userRepository.findUserByEmail(email);

        // if the user already exists, we will return a message that the email is already registered
        if (existingUser) {
            return { success: false, message: "Email Already Registered" };
        }

        // hashing the password if user does not exist in our database 
        const hashedPassword = await bcrypt.hash(password, 10);
        userData.password = hashedPassword;

        const user = await userRepository.createUser(userData);
        console.log("user",userData);
        return { success: true, message: "Successfully Registered", user };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error In Register Service", error };
    }
}


async function loginUser(email, password) {
    try {
        const user = await userRepository.findUserByEmail(email);
        if (!user) {
            return { success: false, message: "User Not Found" };
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: "Invalid Credentials" };
        }
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        user.password = undefined;
        return { success: true, message: "Login Successfully", token, user };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error In Login Service", error : error.message };
    }
}

async function logoutUser() {
    try {
       const result = await userRepository.logoutUser(email);

       if(!result){
           return { success: false, message: "User Not Found" };
       }

        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: Date.now(),
        });

        return { success: true, message: "Logout Successfully", token, user };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error In Logout Service", error };
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
