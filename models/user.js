const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    name: {type: String, required: true, minlength: 3, maxlength: 50},
    lastName: {type: String, required: true, minlength: 3, maxlength: 100},
    user:  {type: String, required: true, minlength: 3, maxlength: 100},
    phone: {type: Number, maxlength: 11, default: 0},
    email: {type: String, required: true, minlength: 5, maxlength: 100},
    password: {type: String, required: true, minlength: 6, maxlength: 200},
    image: {type: String, default: "image-default"},

    createdAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model("User", userSchema)