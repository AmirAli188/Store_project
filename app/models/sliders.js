const mongoose = require('mongoose')

const Schima = new  mongoose.Schema({
    title : {type : String},
    text : {type : String},
    image : {type : String , required : true}
})
const sliderModel = mongoose.model('slider' , Schima)

module.exports = {
    sliderModel
}