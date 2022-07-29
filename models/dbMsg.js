const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    db_msg_id: String,
    msgs: [ { 
        id_user: String,
        msg: String
    } ]

})

module.exports = mongoose.model("dbMsg", userSchema)