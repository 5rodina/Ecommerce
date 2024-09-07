import { model, Schema } from "mongoose";

const cartschema=new Schema({
   
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[{
        product:{
            type:Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        quantity: Number
    }]
  
  
},{timestamps:true})

export const Cart=model('cart',cartschema)