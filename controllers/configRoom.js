const Image = require("../models/image")
const Room = require("../models/rooms")

var user

module.exports = {

    view: async (req, res) => {
        
        const room = await Room.findOne({_id: req.params.id_room})
        const image = await Image.findOne({ uid: room.img})

        user = req.user

        res.render("configRoom", {room, img: image.img})
    },

    update: (req, res) => {
        res.send(req.params.id_room)
    }
}