const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const User = require("../models/user")
const Room = require("../models/rooms")
const DbMsg = require("../models/dbMsg")
const Img = require("../models/image")


const controllerLogin = require("./login/login")
const controllerSign = require("./login/sign")
const rooms = require("../models/rooms")

var room
var user
let image

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
        user = await User.find({ _id: userVerified._id })

        const rooms = await Room.find({ users: user[0]._id })

        var imgs = []

        for(let room of rooms){
            imgs.push( await Img.findOne({ uid: room.img }))
        }


        res.render("rooms", { rooms, imgs })

    },


    redirectRoom: async (req, res) => {

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


        room = await Room.findOne({_id: req.params.id_room})
        if( !room ) return res.status(404).send("Page Not Found")

        try{

            const userVerified = jwt.verify(token, process.env.token_secret)
            user = await User.findOne({ _id: userVerified._id })

        } catch{ user = {_id: ''}}

        const statusUser = await Room.findOne({_id: req.params.id_room, users: user._id})
        
        if( !statusUser ) {
            image = await Img.findOne({uid: room.img})

            if(image){
                return res.render("enterRoom", {room, img: image.img})
            } else { 
                res.status(500).send('Error: ' + err)
            }
            
        }
        res.send(statusUser) // /62e7d9fec6798f62b478146d       erick   sem senha
                             // /62e7da1fc6798f62b4781479       aaa     com senha
    },

    enter: async (req, res) => {

        let pwd

        if(!req.body.pwd){
            pwd = ''
        } else {
            pwd = req.body.pwd
        }

        const match = bcrypt.compareSync(pwd, room.password)
        
        if(match){
            await Room.updateOne({_id: room._id}, { $addToSet: { users: user._id } })
        } else {
            res.redirect("/rooms/" + room._id)

        //    res.render("enterRoom", {room, img: image.img, err: "err"})
        }

        res.send(room)

    }



}