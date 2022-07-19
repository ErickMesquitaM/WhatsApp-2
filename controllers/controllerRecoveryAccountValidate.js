const jwt = require("jsonwebtoken")

const User = require("../models/user")
const codeUser = require("./controllerRecoverAccount")

module.exports = async (req, res) => {

    if( codeUser.code != req.body.code){
        res.redirect("/recover-account-code/new-password")
    } else {
        res.redirect("/recover-account-code")
    }
}

