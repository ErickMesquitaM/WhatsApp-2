const Joi = require("@hapi/joi")

const validate = {
    
    registerValidate: (data) => {
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
    },

    loginValidate: (data) => {
        const schema = Joi.object({
            email: Joi.string().required().min(5).max(100),
            pwd: Joi.string().required().min(6).max(100)
        })
        return schema.validate(data)
    },

    updateValidate: (data) => {
        const schema = Joi.object({
            name: Joi.string().required().min(3).max(50),
            lastName: Joi.string().required().min(3).max(50),
            user: Joi.string().required().min(3).max(50),
            phone: Joi.allow(),
            email: Joi.string().required().min(3).max(100)
        })
        return schema.validate(data)
    }
}

module.exports = validate