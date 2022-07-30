const jwt = require("jsonwebtoken")

const User = require("../models/user")
const Img = require("../models/image")
const Room = require("../models/rooms")
const DbMsg = require("../models/dbMsg")

const controllerLogin = require("./login/login")
const controllerSign = require("./login/sign")

function uid(){ return String( Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '')}

module.exports = {

    new: async (req, res) => {

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

        let idDB = uid()
        let requirePwd = false

        if(req.body.inputPwd){
            requirePwd = true
        }

        const room = new Room({
            name: req.body.name,
            users:  [user[0]._id],
            img: '',
            required_pwd: requirePwd,
            password: req.body.pwd,
            db_msg_id: req.body.name + idDB,
        })
            
        await room.save()

        res.send(room)

        // var imgName

        // if(req.file){

        //     let id = uid()

        //     if( user[0].image != "image-default" ){
        //         await Image.deleteOne({ uid: user[0].image });
        //     }

        //     var obj = {
        //         uid: id,
        //         img: {
        //             data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
        //             contentType: 'image/png'
        //         }
        //     }
        //     Image.create(obj, async (err, item) => {
        //         if(!err) {
        //             await item.save()
        //             await User.updateMany({_id: user[0]._id}, { $set: { image: id } });

        //             fs.unlink("uploads/" + req.file.filename, (err) => { console.log(err) })

        //             updateFinily()
        //         } else {
        //             res.send(err)
        //         }
        //     })

        // }
    


    },

    view: (req, res) => {
        res.render("newRoom")
    }

}