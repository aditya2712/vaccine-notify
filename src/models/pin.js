const mongoose = require('mongoose')

const pinSchema = new mongoose.Schema(
    {
        pin: {
            type: String
        },
        user_ids: [{
            type: String
        }]
    }
)

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;