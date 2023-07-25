const mongoose = require('mongoose')

const Schima = new  mongoose.Schema({
    title : {type : String , required : true} , 
    parent : {type : mongoose.Types.ObjectId ,ref : "category", default : undefined}
} , {
    toJSON : {
        virtuals : true
    }
})
Schima.virtual("children" , {
    ref : "category" , 
    localField : "_id" , 
    foreignField : "parent" , 
})
Schima.pre("findOne" , function(next){
    this.populate([{path : "children" , select : {__v : 0 , id : 0}}])
    next()
})
.pre("find" , function(next){
    this.populate([{path : "children" , select : {__v : 0 , id : 0}}])
    next()
})




const categoryModel = mongoose.model('category' , Schima)

module.exports = {
    categoryModel
}