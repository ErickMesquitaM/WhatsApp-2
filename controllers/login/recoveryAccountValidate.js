
const recover = require("./recoverAccount")

module.exports = {
    
    validate: async (req, res) => {

        if(recover.code == req.body.code){
            recover.code = ''
            res.redirect("/new-password")
        } else {
            res.redirect("/recover-account-code")
        }
    },

    view: (req, res) => {
        if(recover.user == '' || !recover.user) {
            res.send("Access Denied")
        }
        res.render("recoverInnerCode")
    }
}

