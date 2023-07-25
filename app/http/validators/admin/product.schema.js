const Joi = require('@hapi/joi')
const createProductSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("نام کالا صحیح نمیباشد")),
    text : Joi.string().error(new Error("متن وارد شده صحیح نمیباشد")),
    short_text : Joi.string().error(new Error("متن وارد شده صحیح نمیباشد")),
    images : Joi.array().error(new Error("تصویر وارد شده صحیح نمیباشد")),
    category : Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error("دسته بندی مورد نظر یافت نشد")),
    price : Joi.number().error(new Error("قیمت وارد شده صحیح نیست")),
    count : Joi.number().error(new Error("تعداد کالا وارد شده صحیح نیست")),
    discount : Joi.number().error(new Error("تخفیف وارد شده صحیح نیست")),
    type : Joi.string().error(new Error("نوع محصول اشتباه وارد شده است")),

})
module.exports = {
    createProductSchema
}