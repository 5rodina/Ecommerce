import { model, Schema } from "mongoose";

const reviewschema=new Schema({
   
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    rate:{
        type:Number,
         min:0,
         max:5
    },
    comment:String,
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
  
},{timestamps:true})

export const Review=model('Review',reviewschema)