const mongoose = require('mongoose')
const { CommentSchima } = require('./comment')

const EpisodeSchima = new mongoose.Schema({
    title : {type : String , required : true} , 
    text : {type : String , default : ""} , 
    time : {type : String , required : true} , 
    type : {type : String , default : "free" } ,
    video: {type: String , required : true}
})

const chapterSchima = new  mongoose.Schema({
    title : {type : String , required : true} , 
    text : {type : String , default : ""} , 
    episodes : {type : [EpisodeSchima] , default : []}
})
 
const Schima = new mongoose.Schema({
    title : {type : String , required : true} , 
    short_text : {type : String , required : true},
    text : {type : String , required : true},
    image : {type : String , required : true},
    tags : {type : [String] , default : []},
    category : {type : mongoose.Types.ObjectId ,ref : "category", required : true},
    comments : {type : [CommentSchima] , default : []},
    likes : {type :   [ mongoose.Types.ObjectId], default : []},
    dislikes : {type :  [ mongoose.Types.ObjectId] , default : []},
    bookmarks : {type :  [ mongoose.Types.ObjectId], default : []},
    price : {type : Number , default : 0},
    discount : {type : Number ,default :0},
    status : {type : String , default : "Not Started"},
    type : {type : String , required : true },
    time : {type : String , default : "00:00:00" },
    teacher : {type : mongoose.Types.ObjectId,ref : "user" , required : true},
    chapters : {type : [chapterSchima] , default : []} , 
    students : {type : [mongoose.Types.ObjectId] , default : [] , ref : "user"}
} , { toJSON : {virtuals : true}})

Schima.index({title : "text" , text : "text" , short_text : "text"})
const courseModel = mongoose.model('course' , Schima)




Schima.virtual("imageURL").get(function(){
    return `http://localhost:5000/${this.image}`
})

module.exports = {
    courseModel
}  