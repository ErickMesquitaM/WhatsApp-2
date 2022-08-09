
const User = require("../models/user")
const Room = require("../models/rooms")
const DbMsg = require("../models/dbMsg")
const Img = require("../models/image")


module.exports = {

    createNewRoom: (req, res) => {

        res.render("rooms")

    },


    view: async (req, res) => {

        var user = req.user

        let rooms = await Room.find({ users: user._id })

        var imgs = []

        for(let room of rooms){
            imgs.push( await Img.findOne({ uid: room.img }))
        }

        res.render("rooms", { rooms, imgs })
    },

    redirectRoom: async (req, res) => {

        var room
        var user = req.user

        try{
            room = await Room.findOne({ _id: req.params.id_room})
            var img = await Img.findOne({ uid: room.img })
        } catch {}

        if(room){
    
            var userFind = await Room.findOne({ _id: room._id, users: user._id })

            if(userFind){
                res.render("room", {room, img: img.img, user: user.user})
            } else {
                res.redirect("/rooms/" + req.params.id_room + "/enter")
            }

        } else {
            res.status(404).send("Room Not Found")
        }
    }
}