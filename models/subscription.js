const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    user_id: mongoose.Schema.Types.ObjectId,
    plan_id: mongoose.Schema.Types.ObjectId,
    package: String,
    start_date: Date,
    end_date: Date,
    pickup_dates: {},
    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active'
    }
}, {timestamps: true});

module.exports = mongoose.model("Subscription", subscriberSchema)