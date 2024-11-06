const { Schema, model, default: mongoose } = require("mongoose");

const requestschema= new Schema({
    requester:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    wing:{
        type:String,
        required:true
    },
    unit:{
        type:Number,
        required:true,
    },
    priority:{
        type:String,
        default:"Medium",
        enum:['High', 'Medium', 'Low'] 
    },
    status:{
        type:String,
        default:"Open",
        enum:['Open', 'Pending', 'Solve'] 
    },
    apply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
},{timestamps:true})
const Request= model("Request",requestschema)
module.exports=Request;