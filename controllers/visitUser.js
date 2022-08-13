const Img = require("../models/image")
const User = require("../models/user")

module.exports = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id_user})
    const image = await Img.findOne({ uid: user.image })

    res.render("user", { user, img: image.img })
}