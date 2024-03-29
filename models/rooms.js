const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    name: {type: String, required: true, minlength: 1, maxlength: 100},
    users:  Array,
    admin: String,
    img: String,
    required_pwd: {type: Boolean, required: true},
    password: String,
    db_msg_id: String,

    createdAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model("Room", userSchema)