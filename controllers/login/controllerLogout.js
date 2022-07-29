
const jwt = require("jsonwebtoken")

const controllerLogin = require("./controllerLogin")
const controllerSign = require("./controllerSign")

const User = require("../../models/user")

module.exports = async (req, res) => {

    await res.header("user_token", '')
    controllerSign.token = ''
    controllerLogin.token= ''

    res.redirect("/login")
}