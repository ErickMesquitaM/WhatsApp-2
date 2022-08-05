const jwt = require("jsonwebtoken")
const User = require("../../models/user")

module.exports = async (req, res, next) => {

    var token = req.cookies.token

    if (!token) return res.status(401).send("Access Denied: Auth")

    try {
        const userVerified = jwt.verify(token, process.env.token_secret)
        const user = await User.findOne({ _id: userVerified._id })
        req.user = user
        next()
    } catch (error) {
        res.status(401).send("Access Denied: TOKEN ACCESS")
    }
}