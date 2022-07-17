
const controllerLogin = require("./login/controllerLogin")
const controllerSign = require("./login/controllerSign")

module.exports = async (req, res) => {

    let token = null

    if( req.header("user-token") ){
        token = req.header("user-token")
    } else if( !controllerSign.token ){
        token = controllerLogin.token
    } else {
        token = controllerSign.token
    }
    await res.header("user-token", token)
    
    if(token){
        res.redirect("/my-account")
    } else {
        res.redirect("/login")
    }
}