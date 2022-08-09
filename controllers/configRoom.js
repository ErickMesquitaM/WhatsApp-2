const Image = require("../models/image")
const Room = require("../models/rooms")
const User = require("../models/user")

var user

module.exports = {

    view: async (req, res) => {
        
        const room = await Room.findOne({_id: req.params.id_room})
        const image = await Image.findOne({ uid: room.img})

        user = req.user
        var users = []
        
        await room.users.forEach( async (userId) => {

            let userSelected = await User.findOne({ _id: userId })
            users.push(userSelected)

        })

        setTimeout( () => {

            const admin = room.admin == user._id
            res.render("configRoom", {room, img: image.img, users, admin})

        },1000 )
    },

    update: (req, res) => {
        res.send(req.params.id_room)
    },

    exit: (req, res) => {
        res.send("sair")
    }
}