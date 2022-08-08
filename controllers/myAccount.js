const fs = require("fs")
const path = require("path")

const User = require("../models/user")
const Image = require('../models/image')

const validate = require("./login/validate")

function uid(){ return String( Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '')}

var user

module.exports = {
        
    myAccount: async (req, res) => {

        try {

            user = req.user

            Image.findOne({uid: user.image}, (err, items) => {
                if (!err) {

                    res.render("my-account", {user: user, img: items.img})
                } else {
                    res.status(500).send('Error: ' + err)
                }
            })

        } catch (error) {
            res.status(401).send("Access Denied: " + error)
        }
    },

    updateAccount: async (req, res) => {

        const { err } = validate.updateValidate(req.body)
        if(err) return res.send("Error on the form: " + err)

        if(req.file){
            let id = uid()

            if( user.image != "image-default" ){
                await Image.deleteOne({ uid: user.image });
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
            
            await User.updateMany({ _id: user._id }, { $set: { user: req.body.user, phone: req.body.phone } })

            const updateUser = await User.findOne({_id: user._id}) 
            res.cookie('user', updateUser.user, { httpOnly: false })

            res.redirect("/my-account")
        }
    }
}