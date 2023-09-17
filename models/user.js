const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;

    console.log('just before saving')

    next()
})

module.exports = mongoose.model("User", userSchema)