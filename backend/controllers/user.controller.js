// const bcrypt = require('bcrypt');
const BlackListedToken = require('../models/blacklistToken.model');
const UserModel = require('../models/user.model');
const { UserServices } = require('../services');

async function registerUser(req, res) {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with this email." });
        }

        const hashPassword =await UserModel.hashPassword(password);

        const user = await UserServices.createUser({
            firstName,
            lastName,
            email,
            password: hashPassword
        });




        const token = user.generateAuthToken();

        if (user) {
            return res.status(201).json({ message: "User created successfully",token, user: user  });
        } else {
            return res.status(500).json({ message: "Internal server error. Could not create user." });
        }
    } catch (error) {
        console.error("Error in registerUser:", error);
        
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", error: error.message });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function loginUser(req,res) {
    
    const { email, password } = req.body;

    console.log("CAME TO LOGIN USER", email, password);
    try {
        const user = await UserServices.findUserByEmail(email);

        console.log("USER HERE", user);
        if (!user) {
            return res.status(404).json({ message: "User not found with this email." });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password." });
        }

        const token = user.generateAuthToken();
        return res.status(200).json({ message: "User logged in successfully", token, user: user });
    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


async function getUserProfile(req,res)
{
    try {
        const user = req.user;
        return res.status(200).json({ message: "User found", user });
    } catch (error) {
        console.error("Error in getUserProfile:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


async function logoutUser(req,res)
{
    const token = req.header('Authorization');
    await BlackListedToken.create({token});
    return res.status(200).json({message: "User logged out successfully"});
    
}



module.exports = { registerUser,loginUser,getUserProfile,logoutUser};
