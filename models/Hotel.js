const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema(
    {
     img: {
        data: Buffer,
        contentType: String
        },
     name:{
        type:String
     },
     city:{
        type:String
     },
     pin:{
        type:String
     },
     room:{
        type:Number
     },
     bed:{
        type:Number
     },
     bath:{
        type:Number
     },
     area:{
        type:Number
     },
     rent:{
        type:Number
     },
     popular:{
        type:Boolean,
        default:false

     }
    }
)
module.exports=  mongoose.model("hotel",HotelSchema);