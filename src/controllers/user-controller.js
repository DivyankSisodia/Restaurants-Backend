const User = require('../models/user');
const bcrypt = require('bcrypt');

// Getting user info
const getUserController = async (req, res)=>{
    try {
        // find user
        const user = await User.findById({ _id: req.body.id });
        // validation, if user is not found
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found",
                err: err.message
            });
        }

        // hide password from user
        user.password = undefined;
        // send user info
        res.status(200).json({
            success: true,
            message: "User Found",
            user
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Get User API",
            error
        });
    }
};

// Updating user info
const updateUserController = async (req, res) => {
    try {
        // find user
        const user = await User.findById({ _id: req.body.id });
        // validation, if user is not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
                err: err.message
            });
        }
        // update user info
        const { userName, email, phone, address } = req.body;
        if(userName) user.userName = userName;
        if(email) user.email = email;
        if(phone) user.phone = phone;
        if(address) user.address = address;
        // save user info
        await user.save();
        // send user info
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            // if you want to check the updated user info
            user
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Update User API",
            error
        });
    }
}

// Change user password
// const changeUserPasswordController = async (req, res) => {
//     try {
//         //find user
//         const user = await User.findById({ _id: req.body.id });
//         //validation
//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: "User Not Found",
//             });
//         }
//         // get data from user
//         const { oldPassword, newPassword } = req.body;
//         if (!oldPassword || !newPassword) {
//             return res.status(500).send({
//                 success: false,
//                 message: "Please Provide Old or New PasswOrd",
//             });
//         }
//         //check user password  | compare password
//         const isMatch = await bcrypt.compare(oldPassword, user.password);
//         if (!isMatch) {
//             return res.status(500).send({
//                 success: false,
//                 message: "Invalid old password",
//             });
//         }
//         //hashing password
//         var salt = bcrypt.genSaltSync(10);
//         const hashedPassword = await bcrypt.hash(newPassword, salt);
//         user.password = hashedPassword;
//         await user.save();
//         res.status(200).send({
//             success: true,
//             message: "Password Updated!",
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error In Password Update API",
//             error,
//         });
//     }
// };

const changeUserPasswordController = async (req, res) => {
    try {
        // Find user
        const user = await User.findById({ _id: req.body.id });
        // Validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }
        // Get data from request body
        const { oldPassword, newPassword } = req.body;
        console.log("Old Password:", oldPassword);
        console.log("New Password:", newPassword);
        // Compare old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        console.log("isMatch:", isMatch);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid old password",
            });
        }
        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Updated!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Password Update API",
            error,
        });
    }
};

module.exports = {
    getUserController,
    updateUserController,
    changeUserPasswordController
};