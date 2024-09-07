import { model, Schema } from "mongoose";
import { roles, status } from "../../src/utils/constant/enum.js";

const userschema=new Schema({
    userName:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique: true,
    },
    role:{
        type:String,
        enum: Object.values(roles),
        default: roles.USER
    },
    status:{
        type:String,
        enum: Object.values(status),
        default: status.PENDING
    },
    active:{
        type: Boolean,
        default:false
    },
    DOB: Date,
    image: Object,
    wishlist:[{
                type: Schema.Types.ObjectId,
                ref: "Product"
            }],
    isDeleted: {
        type: Boolean,
        default: false
    }, 
},{timestamps:true})

export const User=model('User',userschema)