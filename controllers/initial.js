
const controllerLogin = require("./login/login")
const controllerSign = require("./login/sign")

module.exports = async (req, res) => {

    let token = await req.header("authorization-token")

    
    if(token){
        res.redirect("/my-account")
    } else {
        res.redirect("/login")
    }
}