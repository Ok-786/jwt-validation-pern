const Joi = require('joi');

module.exports.validateCustomerLogin = (customer) => {
    const schema = Joi.object({
        email: Joi.string().min(1).email().required(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(customer);
}

module.exports.validateCustomerRegister = (customer) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(1).email().required(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(customer);
}
