const bcrypt = require("bcryptjs")

const User = require("../models/user")
const recover = require("./controllerRecoverAccount")

const newPassword = {

    updatePwd: async (req, res) => {

        let pwd = bcrypt.hashSync(req.body.pwd)

        await User.updateMany({ _id: recover.user._id }, { $set: { password: pwd } })

        res.redirect("/login")

    },

    view: (req, res) => {
        if(recover.user == '' || !recover.user) {
            res.send("Access Denied")
        }
        res.render("newPassword")
    }

}

module.exports = newPassword