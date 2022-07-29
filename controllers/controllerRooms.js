const jwt = require("jsonwebtoken")

const User = require("../models/user")
const Room = require("../models/rooms")
const DbMsg = require("../models/dbMsg")
const Img = require("../models/image")


const controllerLogin = require("./login/controllerLogin")
const controllerSign = require("./login/controllerSign")
const validate = require("./login/validate")


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

    }

}




    // CREATE ROOM

// const room = new Room({
//     name: "name",
//     users:  [user[0]._id],
//     img: "image-default",
//     required_pwd: false,
//     db_msg_id: "databese msg",
// })
    
// await room.save()