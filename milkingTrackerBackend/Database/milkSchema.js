const mongoose = require('mongoose');

const milkSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        description: 'Quantity in liters',
    },
    startTime: {
        type: String,
        required: true,
        description: 'Time of milking (HH:MM format)',
    },
    endTime:{
        type: String,
        required: true,
        description: 'End Timing of milking'
    },
    duration:{
        type: String,
        required : true,
        description:'Total Duration of Milking'
    }
}, { timestamps: true });

module.exports = mongoose.model('Milk', milkSchema);

