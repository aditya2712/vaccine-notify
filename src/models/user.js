const mongoose = require('mongoose');

const userSchmea = new mongoose.Schema(
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

const User = mongoose.model('User', userSchmea);

module.exports = User

