
const jwt = require("jsonwebtoken")

const controllerLogin = require("./login/controllerLogin")
const controllerSign = require("./login/controllerSign")

const User = require("../models/user")

module.exports = async (req, res) => {

    var token = null

    if( req.header("user-token") ){
        token = req.header("user-token")
    } else if( !controllerSign.token ){
        token = controllerLogin.token
    } else {
        token = controllerSign.token
    }

    try {
        const userVerified = jwt.verify( token, process.env.token_secret )
        const user = await User.find({ _id: userVerified._id })
    
        jwt.sign( {_id: user[0]._id}, process.env.token_secret, { expiresIn: 1 });
    } catch {}

    await res.header("user-token", '')
    controllerSign.token = ''
    controllerLogin.token= ''

    res.redirect("/login")
}