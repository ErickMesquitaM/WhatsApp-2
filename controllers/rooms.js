const jwt = require("jsonwebtoken")

const User = require("../models/user")
const Room = require("../models/rooms")
const DbMsg = require("../models/dbMsg")
const Img = require("../models/image")


const controllerLogin = require("./login/login")
const controllerSign = require("./login/sign")


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
        const user = await User.find({ _id: userVerified._id })

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


        const room = await Room.findOne({_id: req.params.id_room})
        if( !room ) return res.status(404).send("Page Not Found")

        try{

            const userVerified = jwt.verify(token, process.env.token_secret)
            var user = await User.findOne({ _id: userVerified._id })
        } catch{ user = {_id: ''}}

        const statusUser = await Room.findOne({_id: req.params.id_room, users: user._id})
        
        if( !statusUser ) {
            let image = await Img.findOne({uid: room.img})

            if(image){
                return res.render("enterRoom", {room, img: image.img})
            } else { 
                res.status(500).send('Error: ' + err)
            }
            
        }
        res.send(statusUser) // /62e578703d169fad4efef5ed
        
    }
}