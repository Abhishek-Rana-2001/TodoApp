const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true}, 
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }]
},
{
    timestamps:true
})

const User = mongoose.model("User" , userSchema)

module.exports = User