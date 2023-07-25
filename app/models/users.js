const mongoose = require('mongoose')

const Schima = new  mongoose.Schema({
    first_name : {type : String },
    last_name : {type : String },
    username : {type : String  ,lowercase : true},
    mobile : {type : String , required : true },
    email : {type : String ,lowercase : true },
    password : {type : String },
    courses : {type : [mongoose.Types.ObjectId] , default : [] , ref : "course"},
    OTP : {type : Object , default : {
        code : 0,
        expiresIn : 0
    } },
    bills : {type : [] , default : []},
    discount : {type : Number , default : 0},
    birthday : {type : String },
    roles : {type : [String] , default : ["USER"]}
} , {
    toJSON : { virtuals : true}
})
const UserModel = mongoose.model('user' , Schima)

module.exports = {
    UserModel
} 