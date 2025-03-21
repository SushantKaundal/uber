const BlackListedToken = require('../models/blacklistToken.model');
const CaptianModel = require('../models/captain.model');

async function createCaptian({ firstName, lastName, email, hashPassword, phone, vehicle, status }) {
    const password = hashPassword
    try {
        const response = await CaptianModel.create({ firstName, lastName, email, password, phone, vehicle, status });
        return response;
    } catch (error) {
        console.error('Error creating captian:', error);
        throw new Error('Captian creation failed. Please try again later.');
    }
}

async function findCaptianByEmail(email)
{

    try {
        const response = await CaptianModel.findOne({email}).select("+password");
    
        return response
    } catch (error) {
        
        console.log("Error finding captian by email:",error);
        throw new Error("Error finding captian by email");
    }

}

async function logoutCaptian(captian, token)
{
    try {
        const LogoutCaptian = await BlackListedToken.create({token});

        return LogoutCaptian;
    } catch (error) {
        console.log("Error logging out captian:",error);
        res.status(500).json({error:"Error logging out captian"});
    }
}

module.exports = { createCaptian, findCaptianByEmail,logoutCaptian };