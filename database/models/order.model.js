import { model, Schema } from "mongoose";
import { orderStatus, paymentMethod } from "../../src/utils/constant/enum.js";

const orderSchema=new Schema({
   
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
        quantity:{ 
            type: Number,
            default:1
        },
        price: Number,
        finalPrice: Number,
        discount: Number,
        name: String
        }] ,
        phone: String,
        street:String,
        paymentMethod:{
            type: String,
            enum: Object.values(paymentMethod),
            default: paymentMethod.CASH
        },
        status:{
            type: String,
            enum: Object.values(orderStatus),
        },
        coupon:{
            couponId:{  type:Schema.Types.ObjectId,
                ref:'Coupon'},
            code:String,
            discount:Number
        },
        orderPrice:Number,
        finalPrice: Number
},{timestamps:true})
export const Order=model('Order',orderSchema)