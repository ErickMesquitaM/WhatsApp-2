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

    createNewRoom: (req, res) => {

        res.render("rooms")

    },


    view: async (req, res) => {

        var token

        if( req.header("user_token") ){
            console.log("pegou o token do header")
            token = req.header("user_token")

        } else if( !controllerSign.token ){
            token = controllerLogin.token
        } else {
            token = controllerSign.token
        }
        await res.header("user_token", token)

        if (!token) return res.status(401).send("Access Denied")

        const userVerified = jwt.verify(token, process.env.token_secret)
        user = await User.findOne({ _id: userVerified._id })

        let rooms = await Room.find({ users: user._id })

        var imgs = []

        for(let room of rooms){
            imgs.push( await Img.findOne({ uid: room.img }))
        }

        res.render("rooms", { rooms, imgs })
    },

    redirectRoom: async (req, res) => {

        const room = await Room.findOne({ _id: req.params.id_room})
        const img = await Img.findOne({ uid: room.img })

        if(room){

            const userFind = await Room.findOne({ _id: room._id, users: user._id })

            if(userFind){
                // res.render("room", {room, img})   renderizar a sala
                res.send(userFind)
            } else {
                res.redirect("/rooms/" + req.params.id_room + "/enter")
            }
        } else {
            res.status(404).send("Access Denied")
        }


    
    }
}

