const Joi = require("@hapi/joi")

const registerValidate = (data) => {

    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        lastName: Joi.string().required().min(3).max(50),
        user: Joi.string().required().min(3).max(50),
        phone: Joi.allow(),
        email: Joi.string().required().min(3).max(100),
        pwd: Joi.string().required().min(6).max(100),
        confirmPwd: Joi.allow()
    })

    return schema.validate(data)

} //criar modo de dizer que o email já esta em uso

module.exports.registerValidate = registerValidate