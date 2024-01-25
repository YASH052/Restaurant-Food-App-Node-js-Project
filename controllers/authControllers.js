const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body
        //validation
        if (!userName || !email || !password || !phone || !address || !answer) {
            return res.status(500).send({
                success: false,
                message: "provide all fields"
            })
        }
        //check user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: "already registered"
            });
        }
        // hashing
        //const saltRounds = 10;
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            address,
            phone,
            answer
        })
        res.status(201).send({
            success: true,
            message: "successfully registered",
            user,
        })
    }
    catch (error) {
        console.log(error); //
        res.status(500).send({
            success: false,
            message: "Error in register API",
            error,
        })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(500).send({
                success: false,
                message: "please provide email or password"
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user Not Found"
            })
        }

        //check user password  || compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: true,
                message: "invalid credentials"
            })
        }
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "login successfully",
            token,
            user,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login API",
            error
        })
    }
}

module.exports = { registerController, loginController };