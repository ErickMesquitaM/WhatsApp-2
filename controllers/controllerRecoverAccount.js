const User = require("../models/user")

const nodemailer = require("nodemailer")
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "erickmesquita319@gmail.com",
        pass: "eusvlkcqbnnzhseu"
    }
})

module.exports = {

    recovery: async (req, res) => {

        let email

        if(req.body.email){

            var selectedUser = await User.findOne({email: req.body.email})
            if(!selectedUser) return res.status(400).render("recover", {model: "email", req: req.body.email})

            email = selectedUser.email
        } else {

            var selectedUser = await User.findOne({phone: req.body.phone})
            if(!selectedUser) return res.status(400).render("recover", {model: "telefone", req: req.body.phone})

            email = selectedUser.email
        }

        let code =  Math.floor( Math.random() * 9999 ).toString()

        // transport.sendMail({
        //     from: "WhatsApp 2<erickmesquita319@gmail.com>",
        //     to: email,
        //     subject: "código de acesso: " + code,
        //     html: '',
        //     text: ""
        // })

        module.exports.code = code, selectedUser
        module.exports.user = selectedUser
        
        res.render("recoverInnerCode")
    },

    view: (req, res) => {
        res.render("recover")
    }
}