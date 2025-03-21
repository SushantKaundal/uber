const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});

const BlackListedToken = mongoose.model('blacklistedToken', blacklistTokenSchema);
module.exports = BlackListedToken;