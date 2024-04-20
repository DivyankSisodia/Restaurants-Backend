// userController.js

const userService = require("../services/auth-services");
const uploadOnCloudinary = require("../utils/cloudinary");

async function registerController(req, res) {
    try {
        const { userName, email, password, phone, address } = req.body;

        if (!userName || !email || !password || !address || !phone) {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }
        console.log(req.files);

        const profileLocalPath = req.files.profile[0].path;

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
            return res.status(500).send(result);
        }
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Register API",
            error,
        });
    }
}

 
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

module.exports = {
    registerController,
    loginController,
};
