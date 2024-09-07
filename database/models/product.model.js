import { model, Schema } from "mongoose";

const productschema=new Schema({
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
    description:{
        type:String,
        required:true,
        minlength:3,
        maxlength:2000
    },
    imageCover:Object,
    images:[Object],
    price:{
        type:Number,
        required:true,
        min:0
    },
    discount:{
        type:Number,
        required:true,
        min:0,
        max:100
    },
    colors:[String],
    size:[String],
    stock:{
        type:Number,
        default:1,
        min:0
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    subcategory:{
        type:Schema.Types.ObjectId,
        ref:'SubCategory'
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:'Brand'
    },
    rate:{
        type:Number,
        min:0,
        max:5
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
},{timestamps:true,
   versionKey:false,
   toJSON:{ virtuals: true},
   toObject:{ virtuals:true }
})
productschema.methods.inStock = function(quantity) {
    return this.stock < quantity? false : true
}
productschema.virtual('finalPrice').get(function(){
    return this.price - (this.price * ((this.discount || 0) / 100))
})

export const Product=model('Product',productschema)