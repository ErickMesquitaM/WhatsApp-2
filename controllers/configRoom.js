const fs = require("fs")
const path = require('path')

const Image = require("../models/image")
const Room = require("../models/rooms")
const User = require("../models/user")

function uid(){ return String( Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '')}

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

    update: async (req, res) => {

        const room = await Room.findOne({ _id: req.params.id_room })
    
        if(user._id == room.admin){

            if(req.file){

                if( room.img != "image-default-room" ){
                    await Image.findOneAndDelete({ uid: room.img })
                }


                var obj = {
                    uid: req.file.filename,
                    img: {
                        data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
                        contentType: 'image/png'
                    }
                }

                Image.create(obj, async (err, item) => {
                    if(!err) {
                        await item.save()
                        await Room.updateOne({ room }, { $set: { img: req.file.filename } });
    
                        fs.unlink("uploads/" + req.file.filename, (err) => { console.log(err) })
                    } else {
                        res.send(err)
                    }
                })
            }
            
            await Room.updateOne({ room }, { $set: { name: req.body.name }} )

        } else {
            return res.status(401).send("Access Denied")
        }

        setTimeout( () => { res.redirect("/rooms/" + req.params.id_room) }, 400 )
    },

    removeUser: async (req, res) => {

        const room = await Room.findOne({ _id: req.params.id_room })

        if(user._id == room.admin){

            try{
                await Room.findOneAndUpdate({_id: req.params.id_room}, { $pull: { users: "ObjectId('" + req.params.id_user + "')" } })
                res.redirect("/rooms/" + req.params.id_room)
            } catch{
                res.status(401).send("Access Denied")
            }

        } else {
            res.status(401).send("Access Denied")
        }
    }
}