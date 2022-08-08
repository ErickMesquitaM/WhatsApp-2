const bcrypt = require("bcryptjs")

const User = require("../models/user")
const Room = require("../models/rooms")
const DbMsg = require("../models/dbMsg")
const Img = require("../models/image")



var user, image

module.exports = {

    view: async (req, res) => {

        user = req.user
        
        if(!user) return res.redirect("/login")

        const room = await Room.findOne({_id: req.params.id_room})
        if( !room ) return res.status(404).send("Room Not Found")

        image = await Img.findOne({uid: room.img})
        if( !image ) throw res.status(400).send("Error Image")
        
        res.render("enterRoom", {room, img: image.img} )
    },

    enter: async (req, res) => {

        const room = await Room.findOne({_id: req.params.id_room})
        let pwd

        if(!req.body.pwd){
            pwd = ''
        } else {
            pwd = req.body.pwd
        }

        const match = bcrypt.compareSync(pwd, room.password)
        
        if(match){
            await Room.updateOne({_id: room._id}, { $addToSet: { users: user._id } })
            res.redirect("/rooms/" + req.params.id_room )
        } else {
            res.render("enterRoom", {room, img: image.img} )
        }
    }
}