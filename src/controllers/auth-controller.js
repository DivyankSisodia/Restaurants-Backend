// userController.js

const userService = require("../services/auth-services");
const uploadOnCloudinary = require("../utils/cloudinary");

const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body;

        if (!userName || !email || !password || !address || !phone) {
            return res.status(400).json({
                success: false,
                message: "Please Provide All Fields",
            });
        }

        // Check if the file is attached to the request
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Profile image is required",
            });
        }

        // Proceed with uploading the profile image
        const profileLocalPath = req.file.path;

        const profileAvatar = await uploadOnCloudinary(profileLocalPath);

        if (!profileAvatar) {
            return res.status(500).json({
                success: false,
                message: "Error in Uploading Profile Image",
            });
        }

        const result = await userService.registerUser({
            userName, email, password, phone, address, profile: profileAvatar.secure_url
        });

        if (!result.success) {
            return res.status(500).json(result);
        }
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error In Register API",
            error: error.message,
        });
    }
};


async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Email and Password",
            });
        }
        const result = await userService.loginUser(email, password);
        if (!result.success) {
            return res.status(500).send(result);
        }
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Login API",
            error,
        });
    }
}

async function logoutController(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Email",
            });
        }
        const result = await userService.logoutUser(email);
        if (!result.success) {
            return res.status(500).send(result);
        }
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Logout API",
            error,
        });
    }
}

module.exports = {
    registerController,
    loginController,
    logoutController
};