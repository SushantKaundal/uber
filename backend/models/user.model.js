const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
    },
    lastName: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters long"],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "Email must be at least 6 characters long"],
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    socketId: {
        type: String,
    },
});


userSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn : '24h'});
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
