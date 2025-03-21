const CaptianModel = require("../models/captain.model");
const { CaptianServices } = require("../services");



async function RegisterCaptian(req,res)
{
    const { firstName, lastName, email, phone, password, vehicle, location, status } = req.body;

    const hashPassword = await CaptianModel.hashPassword(password);

    try {
        const RegisteredCaptian = await CaptianServices.createCaptian({firstName, lastName, email, hashPassword, phone, vehicle, status})

        const token = await RegisteredCaptian.generateAuthToken();

        res.status(201).json({message:"Captian Registered Successfully",token:token, data:RegisteredCaptian});
       
        
    } catch (error) {
        console.log("Error creating captian:", error);
        res.status(500).json({error:"Captian creation failed, Internal Server Error"});
    }

}

async function LoginCaptian(req,res)
{
    const {email, password} = req.body;
    try {
        const captian = await CaptianServices.findCaptianByEmail(email);
        
        if(!captian)
        {
            return res.status(404).json({message:"Captian not found with this email"});
        }
        const isMatch = await captian.comparePassword(password);
        if(!isMatch)
        {
            return res.status(400).json({message:"Invalid password"});
        }
            const token = await captian.generateAuthToken();
            return res.status(200).json({message:"Captian Logged in Successfully",token:token, data:captian});
        
    } catch (error) {
        console.log("Error finding captian by email:",error);
        res.status(500).json({error:"Error finding captian by email"});
    }
}

async function GetCaptianProfile(req,res)
{
    const captian = req.captian;
try {
    res.status(200).json({data:captian});
} catch (error) {
    console.log("Error getting captian profile:",error);
    res.status(500).json({error:"Error getting captian profile"});
}
}

async function LogoutCaptian(req,res)
{
    const captian = req.captian;
    const token = req.header("Authorization");
    try {
        const logoutCaptian = await CaptianServices.logoutCaptian(captian,token);
        res.status(200).json({message:"Captian Logged out successfully"});
    } catch (error) {
        console.log("Error logging out captian:",error);
        res.status(500).json({error:"Error logging out captian"});
    }
}

module.exports = {RegisterCaptian, LoginCaptian, GetCaptianProfile,LogoutCaptian}