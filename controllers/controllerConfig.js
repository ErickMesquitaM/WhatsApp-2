const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")

const User = require("../models/user")
const Image = require('../models/image')

const controllerLogin = require("./login/controllerLogin")
const controllerSign = require("./login/controllerSign")
const validate = require("./login/validate")


function uid(){ return String( Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '')}


module.exports = {
        
    myAccount: async (req, res) => {

        var token = null

        if( req.header("user-token") ){
            console.log("pegou o token do header")
            token = req.header("user-token")
        } else if( !controllerSign.token ){
            token = controllerLogin.token
        } else {
            token = controllerSign.token
        }
        await res.header("user-token", token)

        
        if (!token) return res.status(401).send("Access Denied")

        try {
            const userVerified = jwt.verify(token, process.env.token_secret)
            const user = await User.find({ _id: userVerified._id })

            Image.find({uid: user[0].image}, (err, items) => {
                if (!err) {

                    res.render("my-account", {user: user[0], img: items[0].img})
                } else {
                    res.status(500).send('Error: ' + err)
                }
            })

        } catch (error) {
            res.status(401).send("Access Denied")
        }
    },

    updateAccount: async (req, res) => {

        var token = null

        if( req.header("user-token") ){
            console.log("pegou o token do header")
            token = req.header("user-token")
        } else if( !controllerSign.token ){
            token = controllerLogin.token
        } else {
            token = controllerSign.token
        }
        await res.header("user-token", token)

        const userVerified = jwt.verify(token, process.env.token_secret)
        const user = await User.find({ _id: userVerified._id })
        if(!user) return res.send("Error in the user")

        const { err } = validate.updateValidate(req.body)
        if(err) return res.send("Error in the form: " + err)

        if(req.file){
            let id = uid()

            if( user[0].image != "image-default" ){
                await Image.deleteOne({ uid: user[0].image });
            }

            var obj = {
                uid: id,
                img: {
                    data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            }
            Image.create(obj, async (err, item) => {
                if(!err) {
                    await item.save()
                    await User.updateMany({_id: user[0]._id}, { $set: { image: id } });

                    fs.unlink("uploads/" + req.file.filename, (err) => { console.log(err) })

                    updateFinily()
                } else {
                    res.send(err)
                }
            })
        } else {
            updateFinily()
        }

        async function updateFinily(){
            await User.updateMany({ _id: user[0]._id }, { $set: { user: req.body.user, phone: req.body.phone } })
            res.redirect("/my-account")
        }
    }
}