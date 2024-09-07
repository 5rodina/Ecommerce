import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Brand } from "../../../database/models/brand.model.js"
import { messages } from "../../utils/constant/messages.js"
import cloudinary from "../../utils/constant/cloudinary.js"

export const addBrand = catchError(async( req, res, next)=>{
     let {name,createdBy} = req.body
     name=name.toLowerCase()
     const slug=slugify(name)
     if(!req.file) return next(new AppError(messages.file.required,400))
     const brandexist=await Brand.findOne({name})
     if(brandexist) return next(new AppError(messages.brand.alreadyExists,409))
     const { secure_url , public_id}= await cloudinary.uploader.upload(req.file.path,{
        folder: "brand"
})

     const brand=new Brand({
          name,
          slug,
          logo:{ secure_url, public_id },
          createdBy,
     })
     const createdbrand= await brand.save()
     if(!createdbrand) {
          await cloudinary.uploader.destroy(public_id)
          return next(new AppError(messages.brand.failToCreate,500))
     }
     return res.json({message: messages.brand.created,
                      success:true,
                      data:createdbrand})
})

export const getBrands= catchError(async( req, res, next)=>{
     const brand= await Brand.find()
     brand || next(new AppError(messages.brand.notFound,404))
     !brand || res.json({success:true,brand})
})

export const getBrand= catchError( async( req, res, next)=>{
     const brand= await Brand.findById(req.params.brandId)
     brand || next(new AppError(messages.brand.notFound,404))
     !brand || res.json({success:true,brand})
})

export const updateBrand= catchError(async( req, res, next   )=>{
     let { name}=req.body
     name=name.toLowerCase()
    
     const brandexist=await Brand.findById(req.params.brandId)
     if(!brandexist) return next(new AppError(messages.brand.notFound,409))
     if(name){
          const nameexist=await Brand.findOne({name , _id:{$ne: req.params.brandId}})
          if(nameexist) return next(new AppError(messages.brand.alreadyExists,409))
          brandexist.name=name
          brandexist.slug=slugify(name)
          }
     if(req.file){
          cloudinary.uploader.destroy(brandexist.logo.public_id)
          const { secure_url, public_id}= await cloudinary.uploader.upload(req.file.path,{
               public_id: brandexist.logo.public_id
          })
          brandexist.logo={ secure_url, public_id}
     }
     const updateBrand= await brandexist.save()
     if(!updateBrand) return next(new AppError(messages.brand.failToupdate,409))
     return res.json({message:messages.brand.updated, 
                      success:true,
                      data:updateBrand})
})

export const deleteBrand= catchError(async( req, res, next)=>{
     const brand= await Brand.findByIdAndDelete(req.params.brandId)
     if(!brand){ 
          return next(new AppError(messages.brand.notFound,404))
     }
     await cloudinary.uploader.destroy(brand.logo.public_id)  
     return res.json({message:messages.brand.deleted,brand})
})