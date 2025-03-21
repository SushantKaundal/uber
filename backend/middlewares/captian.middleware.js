const validatecaptianRegister = (req, res, next) => {
    const { firstName, lastName, email, phone, password, vehicle, location, status } = req.body;

    // Helper function
    const isValidEnum = (value, allowedValues) => allowedValues.includes(value);
  
    // Basic validation
    if (!firstName || firstName.length < 3)
      return res.status(400).json({ error: "First name must be at least 3 characters long" });
  
    if (lastName && lastName.length < 3)
      return res.status(400).json({ error: "Last name must be at least 3 characters long" });
  
    if (!email || email.length < 6)
      return res.status(400).json({ error: "Email must be at least 6 characters long" });
  
    if (!phone)
      return res.status(400).json({ error: "Phone number is required" });
  
    if (!password || password.length < 6)
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
  
    if (!vehicle)
      return res.status(400).json({ error: "Vehicle information is required" });
  
    const { color, plate, capacity, vehicleType } = vehicle;
  
    if (!color || color.length < 3)
      return res.status(400).json({ error: "Vehicle color must be at least 3 characters long" });
  
    if (!plate || plate.length < 3)
      return res.status(400).json({ error: "Vehicle plate must be at least 3 characters long" });
  
    if (!capacity || isNaN(Number(capacity)) || Number(capacity) < 1)
      return res.status(400).json({ error: "Vehicle capacity must be a number and at least 1" });
  
    if (!vehicleType || !isValidEnum(vehicleType, ["CAR", "MOTORCYCLE", "AUTO"]))
      return res.status(400).json({ error: "Vehicle type must be CAR, MOTORCYCLE, or AUTO" });
  
    if (status && !isValidEnum(status, ["ACTIVE", "INACTIVE"]))
      return res.status(400).json({ error: "Status must be ACTIVE or INACTIVE" });
  
    if (location) {
      const { lat, long } = location;
      if ((lat && typeof lat !== "number") || (long && typeof long !== "number")) {
        return res.status(400).json({ error: "Location lat and long must be numbers" });
      }
    }
    next(); 
  };


  const ValidateCaptianLogin =(req,res,next)=>{

    const {email, password}= req.body;
    if(!email || email.length<6)
    {
        return res.status(400).json({error:"Email must be at least 6 characters long"});
    }
    if(!password || password.length<6)
    {
        return res.status(400).json({error:"Password must be at least 6 characters long"});
    }

    next();
  }
  



module.exports={validatecaptianRegister,ValidateCaptianLogin}