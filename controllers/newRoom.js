const bcrypt = require("bcryptjs")
const fs = require("fs")
const path = require("path")
const sharp = require('sharp');

const Img = require("../models/image")
const Room = require("../models/rooms")
const DbMsg = require("../models/dbMsg");


function uid(){ return String( Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '')}

var user

module.exports = {
    
    view: (req, res) => {
        user = req.user
        res.render("newRoom")
    },

    new: async (req, res) => {

        let idDB = uid()
        let requirePwd = false

        if(req.body.inputPwd){
            requirePwd = true
        }

        var imgName

        if(req.file){
            imgName = req.file.filename

            let pathImage = path.join(__dirname + '/../uploads/' + imgName)

            sharp(pathImage).resize(170).toFile('./uploads/' + imgName + '.png', (err, info) => { 
                
                if( err ) throw res.send(err)
        
                fs.unlink("uploads/" + req.file.filename, (err) => { console.log(err) })
            });

            var obj = {
                uid: imgName,
                img: {
                    data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            }
            Img.create(obj, async (err, item) => {
                if(!err) {
                    await item.save()
                    fs.unlink("uploads/" + req.file.filename + ".png", (err) => { console.log(err) })
                
                } else {
                    res.send(err)
                }
            })

        } else {
            imgName = "image-default-room"
        }

        let id = uid()

        const room = new Room({
            name: req.body.name,
            users:  [user._id],
            admin: user._id,
            img: imgName,
            required_pwd: requirePwd,
            password: bcrypt.hashSync(req.body.pwd),

            db_msg_id: id,
        })

        const dbMsg = new DbMsg({
            db_msg_id: id,
            msgs: [],
        })
            
        await room.save()
        await dbMsg.save()

        res.redirect("/rooms/" + room._id)
    }
}