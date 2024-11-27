const { Schema, default: mongoose, model } = require("mongoose");
const Owner = require('../models/Owener.model');
const Tenante = require('../models/Tenent.model');
const User = require('../models/user.schema');

const notificationschema= new Schema({
    title:{
        type:String
    },
    name:{
        type:String
    },
    message:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    read:{
        type:Boolean,
        default:false
    },
    users:[{
        _id:{type:mongoose.Schema.Types.ObjectId ,  refPath: 'users.model'},
        model:{
            type:String,
            enum:["Owner","Tenante","User"]
        }
}]
},{timestamps:true})
const Notification= model("Notification",notificationschema)
module.exports=Notification;