
const jwt = require("jsonwebtoken")

const controllerLogin = require("./login/controllerLogin")
const controllerSign = require("./login/controllerSign")

const User = require("../models/user")

module.exports = async (req, res) => {

    await res.header("user-token", '')
    controllerSign.token = ''
    controllerLogin.token= ''

    res.redirect("/login")
}