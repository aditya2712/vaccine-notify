const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        pins: [{
            type: String
        }]
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User

