const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    name: String,
    amount: Number,
    duration: Number
}, { timestamps: true });

module.exports = mongoose.model('Plans', planSchema)