const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {

    let token = req.header("authorization-token")

    console.log("TOKEN: " + token)

    if (!token) return res.status(401).send("Access Denied: Auth")

    try {
        const userVerified = jwt.verify(token, process.env.token_secret)
        req.user = userVerified
        next()
    } catch (error) {
        res.status(401).send("Access Denied: TOKEN")
    }

}
