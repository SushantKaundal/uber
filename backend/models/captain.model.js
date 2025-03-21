const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captianSchema = new mongoose.Schema({
firstName:{
    type:String,
    required:true,
    minlength:[3,"First name must be at least 3 characters long"],
},
lastName:{
    type:String,
    minlength:[3,"Last name must be at least 3 characters long"],
},
email:{
    type:String,
    required:true,
    trim:true,
    minlength:[6,"Email must be at least 6 characters long"],
    unique:true,
},
phone:{
type:Number,
required:true,
},
password:{
    type:String,
    required:true,
    select:false,
    minlength:[6,"Password must be at least 6 characters long"],
},
sockitId:{
    type:String,
},
status:{
    type:String,
    Enum:["ACTIVE","INACTIVE"],
    default:"ACTIVE",
},
vehicle:{
    color:{
        type:String,
        required:true,
        minlength:[3,"Color must be at least 3 characters long"],
    },
    plate:{
        type:String,
        required:true,
        minlength:[3,"Plate must be at least 3 characters long"],
    },
    capacity:{
        type:String,
        required:true,
        min:[1,"Capacity must be at least 1"],
    },
    vehicleType:{
        type:String,
        required:true,
        Enum:["CAR","MOTORCYCLE","AUTO"],
    },
},
location:{
    lat:{
        type:Number,
    },
    long:{
        type:Number,
    },
}
})


captianSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,12);
}

captianSchema.methods.generateAuthToken= async function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}
captianSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const CaptianModel = mongoose.model("captain",captianSchema);
module.exports = CaptianModel;