import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { messages } from "../../utils/constant/messages.js"
import cloudinary from "../../utils/constant/cloudinary.js"
import {Product, SubCategory, Brand} from '../../../database/index.js'
import { apiFeature } from "../../utils/constant/apiFeature.js"

export const addProduct = catchError(async( req, res, next)=>{
    let { name,description,category,subcategory,brand,price, discount,colors,stock } = req.body
    
    const subcategoryexist=await SubCategory.findById(subcategory)
    if(!subcategoryexist) return next(new AppError(messages.subCategory.notFound,404))
    const brandexist=await Brand.findById(brand)
    if(!brandexist) return next(new AppError(messages.brand.notFound,404))
   
    if(!req.files.imageCover || req.files.imageCover.length === 0) return next(new AppError(messages.file.required,400))
    const { secure_url, public_id }= await cloudinary.uploader.upload(req.files.imageCover[0].path,{
     folder:"product/imageCover"})    
    req.body.imageCover={ secure_url, public_id}  
    
    const subImages = []
    for (const file of req.files.images) {
     const { secure_url, public_id }= await cloudinary.uploader.upload(file.path,{
      folder:"product/images"}) 
     subImages.push({ secure_url, public_id})
    }
    const product= new Product({
       name:name.toLowerCase(),
       slug:slugify(name),
       description,
       category,
       subcategory,
       brand,
       price,
       discount,
       colors,
       stock,
       imageCover:req.body.imageCover,
       images:subImages,
       createdBy: req.authUser._id
    })
    const createProduct= await product.save()
    if(!createProduct) {
      await cloudinary.uploader.destroy(imageCover.public_id)
      for (const element of subImages) {
          await cloudinary.uploader.destroy(element.public_id)
      }
      return next(new AppError(messages.product.failToCreate,500))
    }
    return res.json({message: messages.product.created,
                    success:true,
                    data: createProduct
               })
})

export const getProducts= catchError(async( req, res, next)=>{
     
     const apifeature= new apiFeature(Product.find(), req.query).pagination().select().sort().filter()
     const product= await apifeature.mongooseQuery
     res.json({message:"success",data:product })
})

export const getProduct= catchError( async( req, res, next)=>{
     const product= await Product.findById(req.params.id)
     product || next(new AppError("product not found",404))
     !product || res.json({message:"success",product})
})


export const updateproduct= catchError(async( req, res, next   )=>{
     let { price, stock}=req.body
     const productexist=await Product.findById(req.params.id)
     if(!productexist) return next(new AppError(messages.product.notFound,409))
     if(price){
          productexist.price=price
     }
     if(stock){
          productexist.stock=stock
     }
     const updated= await productexist.save()
     if(!updated) return next(new AppError(messages.category.failToupdate,409))
     return res.json({message:messages.category.updated, 
                      success:true,
                      data:updated})
})

export const deleteProduct= catchError(async( req, res, next)=>{
     const product= await Product.findById(req.params.id)
     if(!product){ 
          return next(new AppError(messages.product.notFound,404))
     }
     await cloudinary.uploader.destroy(product.imageCover.public_id)
     for (const element of product.images) {
         await cloudinary.uploader.destroy(element.public_id)
     }
     const deletedproduct= await Product.findByIdAndDelete(req.params.id)
     return res.json({message:messages.product.deleted,deletedproduct})
})