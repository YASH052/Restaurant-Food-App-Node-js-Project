const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')
// GET USER INFO
const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id }, { _id: 0 })
        //validation
        if (!user) {
            return res.status(404).SEND({
                success: false,
                message: "User not found"
            })
        }
        // hide password
        user.password = undefined
        //resp
        res.status(200).send({
            success: true,
            message: 'User get successfully ',
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in get user API",
            error
        })

    }
}

// update function
const updateUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id })
        //va;idation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        //update

        const { userName, address, phone } = req.body
        if (userName) user.userName = userName
        if (address) user.address = address
        if (phone) user.phone = phone
        //save user
        await user.save()
        res.status(200).send({
            success: true,
            message: "User Updated Successfully!"
        })
    }

    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in update user API",
            error
        })
    }
}
const updatePasswordController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({ _id: req.body.id });
        //valdiation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Usre Not Found",
            });
        }
        // get data from user
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Old or New PasswOrd",
            });
        }
        //check user password  | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid old password",
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
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

// reset passsword
const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "please provide all fields"
            })
        }
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User Not Found or invalid credentials"
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success: true,
            message: 'password reset successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in reset password API",
            error
        })
    }
}

//delete profile,account
const deleteProfileController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: 'profile deleted successfully'
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in delete profile API",
            error,
        })
    }
}

module.exports = {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteProfileController,
};