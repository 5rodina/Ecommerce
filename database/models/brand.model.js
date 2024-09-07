import { model, Schema } from "mongoose";

const brandschema=new Schema({
    name:{ 
        type:String,
        unique:[true, 'name is required'],
        trim:true,
        required:true,
        minlength:[2,'too short category name']
    },
    slug:{
        type: String,
        lowercase:true,
        required:true
    },
    logo:{
        type:Object,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

export const Brand=model('Brand',brandschema)