const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const CaptianModel = require("../models/captain.model");
const BlackListedToken = require('../models/blacklistToken.model');

const validateUser= async (req, res, next)=> {


    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const isBlackListed = await BlackListedToken.findOne({token});

    if(isBlackListed)
    {
        return res.status(401).json({ message: "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded._id);        

        req.user = user;
        next();
        
    } catch (error) {
       return res.status(401).json({ message: "Unauthorized" });   
    }
}


const ValidateCaptian= async (req, res, next)=> {


    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const isBlackListed = await BlackListedToken.findOne({token});

    if(isBlackListed)
    {
        return res.status(401).json({ message: "Unauthorized"})
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const captian = await CaptianModel.findById(decoded._id);    

        req.captian = captian;
        next();
        
    } catch (error) {
       return res.status(401).json({ message: "Unauthorized" });   
    }
}

module.exports={validateUser,ValidateCaptian}