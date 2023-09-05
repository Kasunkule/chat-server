const jwt = require("jsonwebtoken");

const User = require("../models/user");

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

exports.login = async (req, res, next) => {


    const { emaol, password } = req.body;

    if (!email || !password) {
        req.status(400).json({
            status: "error",
            message: "Both email and password are required"
        });
    }

    const userDoc = await User.findOne({ email: email }).select("+password");

    if (!user || (await userDoc.correctPassword(password, userDoc.password))) {
        res.status(400).json({
            status: "error",
            messsage: "Email is incorrect",
        });
    }

    const token = signToken(userDoc._id);

    res.status(200).json({
        status: "success",
        messge: "Logged in successfully",
        token,
    });
}