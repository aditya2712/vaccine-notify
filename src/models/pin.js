const mongoose = require('mongoose')

const pinSchmea = new mongoose.Schema(
    {
        pins: [{
            type: String
        }]
    }
)