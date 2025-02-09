const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    github:{
        type:String
    },
    linkedin:{
type:String
    },
    profile:{
        type:String
    }
})



const users = mongoose.model("usrrs",userSchema)
module.exports = users