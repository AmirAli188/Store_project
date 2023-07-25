const Joi = require('@hapi/joi')
const createBlogSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    text : Joi.string().error(new Error("متن وارد شده صحیح نمیباشد")),
    short_text : Joi.string().error(new Error("متن وارد شده صحیح نمیباشد")),
    image : Joi.string().error(new Error("تصویر وارد شده صحیح نمیباشد")),
    tags : Joi.array().min(0).max(30).error(new Error("برچسب وارد شده صحیح نیست")),
    category : Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error("دسته بندی مورد نظر یافت نشد"))
})
module.exports = {
    createBlogSchema
}