const User = require("../../models/user")
const bcrypt = require("bcryptjs")

const { registerValidate, loginValidate } = require("./validate")

const userController = {
    
    sign: async (req, res) => {

        const {error} = registerValidate(req.body)
        if (error){ return res.status(400).send(error.message + " erroaaaaaaaaaa") }

        const selectedUser = await User.findOne({email: req.body.email})
        if(selectedUser) return res.status(400).send("Email já registrado")

        res.send(req.body)

    //     const user = new User({
    //         name: req.body.name,
    //         lastName: req.body.lastName,
    //         user: req.body.user,
    //         phone: req.body.phone,
    //         email: req.body.email,
    //         password: bcrypt.hashSync(req.body.pwd)
    //     })

    //     try{
    //         const savedUser = await user.save()
    //         res.send(savedUser)
    //     } catch (error) {
    //         res.status(400).send(error)
    //     }

    }, 

    router: (req, res) => {
        res.render("sign")
    }


}


module.exports = userController