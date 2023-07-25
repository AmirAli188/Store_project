const mongoose = require('mongoose')
const { CommentSchima } = require('./comment')

const Schima = new mongoose.Schema({
    title : {type : String , required : true} , 
    short_text : {type : String , required : true},
    text : {type : String , required : true},
    images : {type : [String] , required : true},
    tags : {type : [String] , default : []},
    category : {type : mongoose.Types.ObjectId ,ref : "category", required : true},
    comments : {type : [CommentSchima] , default : []},
    likes : {type :   [ mongoose.Types.ObjectId], default : []},
    dislikes : {type :  [ mongoose.Types.ObjectId] , default : []},
    bookmarks : {type :  [ mongoose.Types.ObjectId], default : []},
    price : {type : Number , default : 0},
    discount : {type : Number ,default :0},
    count : {type : Number },
    type : {type : String , required : true },
    format : {type : String },
    supplier : {type : mongoose.Types.ObjectId ,ref : "user", required : true},
    feture : {type : Object , default : {
        length : "",
        heigh : "" ,
        width : "" ,
        weight : "",
        colors : [],
        model : [],
        madein : [] 
    }}
})
Schima.index({title : "text" , text : "text" , short_text : "text"})
const productModel = mongoose.model('product' , Schima)

module.exports = {
    productModel
}  