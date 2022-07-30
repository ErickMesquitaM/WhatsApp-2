
const jwt = require("jsonwebtoken")

const controllerLogin = require("./login")
const controllerSign = require("./sign")

const User = require("../../models/user")

module.exports = async (req, res) => {

    await res.header("user_token", '')
    controllerSign.token = ''
    controllerLogin.token= ''

    res.redirect("/login")
}