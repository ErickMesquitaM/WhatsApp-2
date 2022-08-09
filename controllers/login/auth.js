const jwt = require("jsonwebtoken")
const User = require("../../models/user")

module.exports = async (req, res, next) => {

    var token = req.cookies.token

    if (!token) {

        res.cookie('id_room', req.params.id_room)
        return res.redirect("/login")
    }

    try {
        const userVerified = jwt.verify(token, process.env.token_secret)
        const user = await User.findOne({ _id: userVerified._id })
        req.user = user
        next()
    } catch (error) {

        res.clearCookie("token")
        res.status(401).send("Access Denied: TOKEN ACCESS")
    }
}