const Image = require("../models/image")
const Room = require("../models/rooms")
const User = require("../models/user")

var user

module.exports = {

    view: async (req, res) => {
        user = req.user

        try {
            var room = await Room.findOne({_id: req.params.id_room, users: user._id})
            var image = await Image.findOne({ uid: room.img})
        } catch {
            return res.status(404).send("Access Denied")
        }

        var users = []
        
        await room.users.forEach( async (userId) => {

            let userSelected = await User.findOne({ _id: userId })
            users.push(userSelected)

        })

        setTimeout( () => {

            const admin = room.admin == user._id
            res.render("configRoom", {room, img: image.img, users, admin})

        }, 400 )
    },

    update: (req, res) => {
        res.send(req.params.id_room)
    },

    exit: (req, res) => {
        res.send("sair")
    }
}