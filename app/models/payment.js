const mongoose = require('mongoose')

const Schima =new  mongoose.Schema({

})
const paymentModel = mongoose.model('payment' , Schima)

module.exports = {
    paymentModel
}