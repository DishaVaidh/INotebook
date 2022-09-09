const mongoose = require('mongoose')
const {Schema} = mongoose;
const Userschema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})
const User = mongoose.model('user',Userschema)//first argu is name of model
//User.createIndexes();//for non duplicate values of email
module.exports = User