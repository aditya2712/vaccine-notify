const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        mobile: {
            type: String
        },
        token: {
            type: String
        },
        pins: [{
            type: String
        }]
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User

