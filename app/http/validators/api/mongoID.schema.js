const Joi = require('@hapi/joi')

const mongoIdSchema = Joi.object({
    id :  Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error(" شناسه وارد شده صحیح نیست"))
})
module.exports = {
    mongoIdSchema
}