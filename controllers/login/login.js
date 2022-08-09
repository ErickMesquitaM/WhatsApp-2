const User = require("../../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const validate = require("./validate")

const datas = {
    email: '',
    pwd: '', 
    msn: 'msn',
}

const userControlls = {

    login: async (req, res) => {

        const {error} = validate.loginValidate(req.body)
        if (error){ return res.status(400).render("login", {data: req.body}) }

        const selectedUser = await User.findOne({email: req.body.email})
        if(!selectedUser) return res.status(400).render("login", {data: req.body})

        const passwordAndUserMatch = bcrypt.compareSync(req.body.pwd, selectedUser.password)
        if(!passwordAndUserMatch) return res.status(400).render("login", {data: req.body})
                
        let token = jwt.sign({ _id: selectedUser._id }, process.env.token_secret)

        res.cookie('token', token, { httpOnly: false })
        res.cookie('user', selectedUser.user, { httpOnly: false })

        if( req.cookies.id_room ){
            res.redirect("/rooms/" + req.cookies.id_room)
        } else {
            res.redirect("/my-account")
        }
    },
    view: (req, res) => {
        res.render("login", {data: datas})
    }
}


module.exports.view = userControlls.view
module.exports.login = userControlls.login