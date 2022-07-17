const jwt = require("jsonwebtoken")

const User = require("../../models/user")
const bcrypt = require("bcryptjs")

const validate = require("./validate")

const datas = {
    user: '',
    phone: '',
    email: '',
    pwd: '',
}

const userController = {
    
    sign: async (req, res) => {

        const {error} = validate.registerValidate(req.body)
        if (error){ return res.status(400).send(error.message) }

        const selectedUser = await User.findOne({email: req.body.email})
        if( selectedUser ){ return res.render("sign", { data: req.body }) }

        const user = new User({
            user: req.body.user,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.pwd)
        })

        try{

            const newUser = await User.findOne({email: req.body.email})
            const token = jwt.sign({ _id: newUser._id }, process.env.token_secret)
          
            await res.header("user-token", token)
            module.exports.token = token

            await user.save()
            res.redirect("/config")
            
        } catch (error) {
            res.status(400).send("Erro ao criar o usuário: " + error)
        }
    }, 

    router: (req, res) => {
        res.render("sign", {data: datas})
    }
}


module.exports = userController