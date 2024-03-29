
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

        var user = req.user

        try{
            var room = await Room.findOne({ _id: req.params.id_room})
            var img = await Img.findOne({ uid: room.img })
        } catch {
            return res.status(404).send("Access Denied")
        }

        if(room){
    
            var userFind = await Room.findOne({ _id: room._id, users: user._id })

            var dbMsg = await DbMsg.findOne({ db_msg_id: room.db_msg_id })
            var users = []


            await room.users.forEach( async (user) => {
                users.push({ _id: user,
                            user: await User.findOne({ _id: user })  })  
            });

            if(userFind){

                setTimeout( () => {
                
                    res.render("room", {room, img: img.img, user: user._id, msgs: dbMsg.msgs, users})
                
                }, 1000)

            } else {
                res.redirect("/rooms/" + req.params.id_room + "/enter")
            }

        } else {
            res.status(404).send("Room Not Found")
        }
    },

    exit: async (req, res) => {

        await Room.findOneAndUpdate({_id: req.params.id_room}, { $pull: { users: req.user._id } })        
        const room = await Room.findOne({_id: req.params.id_room})
        
        if(room.users.length == 0){

            if( room.img != "image-default-room" ){
                await Img.deleteOne({ uid: room.img})
            }
            await Room.deleteOne({_id: room._id})
        
        } else if( room.admin == req.user._id ){

            await Room.updateOne({ room }, { admin: room.users[0] })
        }

        res.redirect("/rooms")
    }
}