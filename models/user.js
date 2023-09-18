const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");


const userScema = new mongoose.Schema({
    firstName: {
        type: String,
        require: [true, "First Name is required"],
    },
    lastName: {
        type: String,
        require: [true, "Last Name is required"],

    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: function (params) {
                return String(email).toLowerCase().match(
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)
                );
            },
            message: (props) => `Email (${props.value}) is invalid`,
        },
    },
    password: {
        type: String,
    },

    passwordConfirm: {
        type: String,
    },
    passwordChangedAt: {
        type: Date,
    },

    passwordResetToken: {
        type: String,
    },

    passwordResetExpires: {
        type: Date,
    },

    updatedAt: {
        type: Date,
    },
    verified: {
        type: Boolean,
        defalt: false,
    },
    otp: {
        type: Number,
    },
    otp_expiry_time: {
        type: Date,
    },

});

userScema.pre("save", async function (next) {

    if (!this.isModified("otp")) return next();

    this.otp = await bcryptjs.hash(this.otp, 12);

    next();

});

userScema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    this.password = await bcryptjs.hash(this.password, 12);

    next();

});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userpassword);
};

userSchema.methods.correctOTP = async function (
    candidateOTP,
    userOTP
) {
    return await bcrypt.compare(candidateOTP, userOTP);
};

userSchema.methods.correctPasswordResetToken = function () {

    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

userSchema.methods.changePasswordAfter = function (timestamp) {
    return timestamp < this.passwordChangedAt;
};



const User = new mongoose.model("User", userSchema);
module.exports = User;