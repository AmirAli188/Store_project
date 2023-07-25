const Joi = require('@hapi/joi')
const addCategorySchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    parent : Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).allow('').error(new Error("شناسه وارد شده صحیح نمیباشد"))

})
const updateCategorySchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
})


module.exports = {
    addCategorySchema , 
    updateCategorySchema
}