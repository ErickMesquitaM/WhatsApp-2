const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const User = require("../models/user")
const Room = require("../models/rooms")
const DbMsg = require("../models/dbMsg")
const Img = require("../models/image")


const controllerLogin = require("./login/login")
const controllerSign = require("./login/sign")
const rooms = require("../models/rooms")

var user

module.exports = {

    view: async (req, res) => {

        var token

        if( req.header("user_token") ){
            token = req.header("user_token")

        } else if( !controllerSign.token ){
            token = controllerLogin.token
        } else {
            token = controllerSign.token
        }
        await res.header("user_token", token)

        const userVerified = jwt.verify(token, process.env.token_secret)
        user = await User.findOne({ _id: userVerified._id })

        if(!user) return res.redirect("/login")

        const room = await Room.findOne({_id: req.params.id_room})
        if( !room ) return res.status(404).send("Room Not Found")

        const image = await Img.findOne({uid: room.img})
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
            res.redirect("/rooms")
        } else {
            res.render("enterRoom", {room, img: image.img} )

        //    res.render("enterRoom", {room, img: image.img, err: "err"})
        }
    }
}

 // /62e7da1fc6798f62b4781479       aaa     com senha
 // /62e7d9fec6798f62b478146d       erick   sem senha