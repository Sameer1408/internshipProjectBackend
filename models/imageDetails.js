const mongoose = require('mongoose');

const ImageDetailsSchema = new mongoose.Schema(
    {
     img: {
        data: Buffer,
        contentType: String
        },
     name:{
        type:String
     },
     type:{
        type:String
     },
     page:{
       type:Number
     },
     average:{
        type:Number
     },
     gear:{
        type:String
     },
     rent:{
        type:Number
     },
     year:{
        type:Number
     },
     people:{
      type:Number
     }
    }
)
module.exports=  mongoose.model("ImageDetails",ImageDetailsSchema);