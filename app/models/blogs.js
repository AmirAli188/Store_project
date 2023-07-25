const mongoose = require('mongoose')
const { CommentSchima } = require('./comment')


const Schima = new  mongoose.Schema({
    author : {type : mongoose.Types.ObjectId , ref : "user" , required : true} ,
    title : {type : String , required : true} , 
    short_text : {type : String , required : true} , 
    text : {type : String , required : true},
    tags : {type : [String],default : [""] },
    image : {type : String , required : true},
    category : {type : mongoose.Types.ObjectId,ref : "category" , required : true},
    comments : {type : [CommentSchima] , default : []},
    likes : {type : [mongoose.Types.ObjectId] ,ref : "user", default : []} ,
    dislikes : {type : [mongoose.Types.ObjectId] ,ref : "user", default : []},
    bookmarks : {type : [mongoose.Types.ObjectId] ,ref : "user", default : []},

} , {timestamp : true , versionKey : false , toJSON : {virtuals : true}})
Schima.virtual("user" , {
    ref : "user" , 
    foreignField : "author" , 
    localField : "_id" ,

})
Schima.virtual("category_detail" , {
    ref : "category" , 
    foreignField : "category" , 
    localField : "_id" ,

})



const blogsModel = mongoose.model('blog' , Schima)

module.exports = {
    blogsModel
}