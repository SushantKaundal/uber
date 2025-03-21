const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log('Connected to database');
        }).catch((error)=>{
            console.log('Error connecting to database:', error.message);
        });
    } catch (error) {
        console.log('Error connecting to database:', error.message);
    }
}
module.exports = connectToDb;