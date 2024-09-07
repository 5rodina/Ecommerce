
import { model, Schema } from "mongoose";

const caregoryschema=new Schema({
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
    image:{
        type:Object,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true,
   toJSON:{ virtuals: true},
   toObject:{ virtuals: true}
})

caregoryschema.virtual("subcategories",{
    localField:"_id",
    foreignField:"category",
    ref:"SubCategory"
})

caregoryschema.virtual("products",{
    localField:"_id",
    foreignField:"category",
    ref:"Product"
})
export const Category=model('Category',caregoryschema)