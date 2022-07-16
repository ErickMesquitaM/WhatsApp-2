const mongoose = require("mongoose")


const imageSchema = mongoose.Schema({

    uid: {type: String, default: "image-default"},
    img: { data: Buffer, contentType: String },

    createdAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model("Image", imageSchema)