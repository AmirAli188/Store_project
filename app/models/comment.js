const mongoose = require('mongoose')

const CommentSchima = new  mongoose.Schema({
    user : {type : mongoose.Types.ObjectId ,ref : "users", required : true } , 
    comment : {type : String , required : true},
    createdAt : {type : Date , default : new Date().getTime()},
    parent : {type : mongoose.Types.ObjectId}
})


module.exports = {
    CommentSchima
}