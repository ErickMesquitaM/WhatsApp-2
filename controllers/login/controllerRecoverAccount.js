const User = require("../../models/user")

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

function geratorCode(){

    let code = Math.floor( Math.random() * 9999 ).toString()

    if(code.slice(3) == 0){
        geratorCode()
    } else {
        return code
    }
}

module.exports = {

    recovery: async (req, res) => {

        let email

        if(req.body.email){

            var selectedUser = await User.findOne({email: req.body.email})
            if(!selectedUser) return res.status(400).render("recover", {model: "email"})

            email = selectedUser.email
        } else {

            var selectedUser = await User.findOne({phone: req.body.phone})
            if(!selectedUser) return res.status(400).render("recover", {model: "phone" })

            email = selectedUser.email
        }

        let code = geratorCode()

        transport.sendMail({
            from: "WhatsApp 2<erickmesquita319@gmail.com>",
            to: email,
            subject: "código de acesso: " + code,
            html: '',
            text: ""
        })

        module.exports.code = code
        module.exports.user = selectedUser
        
        res.redirect("/recover-account-code")
    },

    view: (req, res) => {
        res.render("recover")
    }
}