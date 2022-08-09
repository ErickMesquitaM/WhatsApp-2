const User = require("../models/user")

module.exports = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id_user})

    res.render("user", { user })
}