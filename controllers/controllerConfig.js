const jwt = require("jsonwebtoken")

module.exports = (req, res) => {

    const token = req.header("user-token")

    console.log(token)

    if (!token) return res.status(401).send("Access Denied")

    try {
        const userVerified = jwt.verify(token, process.env.tokenSecret)
        console.log(userVerified)
    } catch (error) {
        res.status(401).send("Access Denied")
    }
    // res.render("config", {user: user})
}