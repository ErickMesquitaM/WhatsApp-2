const jwt = require("jsonwebtoken")
const User = require("../models/user")

const controllerLogin = require("./login/controllerLogin")
const controllerSign = require("./login/controllerSign")

module.exports = async (req, res) => {

    var token = null

    if( req.header("user-token") ){
        token = req.header("user-token")

    } else if( !controllerSign.token ){
        token = controllerLogin.token

    } else {
        token = controllerSign.token

    }
    await res.header("user-token", token)
    
    if (!token) return res.status(401).send("Access Denied")

    try {

        const userVerified = jwt.verify(token, process.env.token_secret)
    
        const user = findById(userVerified._id)
        res.send(user)

        
    } catch (error) {
        res.status(401).send("Access Denied")
    }
    // res.render("config", {user: user})
}