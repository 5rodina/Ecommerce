import { model, Schema } from "mongoose";
import { couponType } from "../../src/utils/constant/enum.js";

const couponschema=new Schema({
    code:{
        type:String,
        unique:true,
        required:true
    },
    discount:Number,
    couponType: {
        type: String,
        enum: Object.values(couponType),
        default: couponType.FIXEDAMOUNT
    },
    fromDate:{
        type:String,
        required:true
    },
    toDate:{
        type:String,
        required:true
    },
    assignedToUser: [
        {
            userId: { type: Schema.Types.ObjectId , ref: "User"},
            maxUse: { type: Number, max: 5},
            useCount: Number
        }
    ],
    createdBy:
        { type: Schema.Types.ObjectId , ref: "User"},
},{timestamps:true})

export const Coupon=model('Coupon', couponschema)