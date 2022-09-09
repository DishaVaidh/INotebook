const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"//generated from mongodbcompass when we click on paste to url 

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongo successfully")
    })
}

module.exports = connectToMongo;