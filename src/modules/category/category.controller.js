import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { messages } from "../../utils/constant/messages.js"
import { Category, SubCategory, Product} from '../../../database/index.js'
import cloudinary from "../../utils/constant/cloudinary.js"


export const addCategory = catchError(async( req, res, next)=>{
     let {name} = req.body
     name = name.toLowerCase()
     const slug=slugify(name)
     if(!req.file) return next(new AppError(messages.file.required,400))
          console.log(req.file);
     
     const categoryExist= await Category.findOne({name})
     if(categoryExist) return next(new AppError(messages.category.alreadyExists,409))
     const { secure_url , public_id}= await cloudinary.uploader.upload(req.file.path,{
              folder: "category"
      })   

     const category=new Category({
          name,
          slug,
          image:{ secure_url, public_id },
          createdBy : req.authUser._id
     })

     
     const createdcategory= await category.save()
     if(!createdcategory) {
          await cloudinary.uploader.destroy(public_id)
          return next(new AppError(messages.category.failToCreate,500))
     }
     return res.json({message:messages.category.created,
                      success:true, 
                      data:createdcategory})
})

export const getcategories= catchError(async( req, res, next)=>{
     const category= await Category.aggregate([
          {
               $lookup:{
                    from:'subcategories',
                    localField:"_id",
                    foreignField:"category",
                    as:"SubCategories"
               }
          }
     ])
     category || next(new AppError(messages.category.notFound,404))
     !category || res.json({success:true,category})
})

export const getcategory= catchError( async( req, res, next)=>{
     const category= await Category.findById(req.params.categoryId).populate('subcategories')
     category || next(new AppError(messages.category.notFound,404))
     !category || res.json({success:true,category})
})

export const updatecategory= catchError(async( req, res, next   )=>{
     let { name}=req.body
     name=name.toLowerCase()
    
     const categoryexist=await Category.findById(req.params.categoryId)
     if(!categoryexist) return next(new AppError(messages.category.notFound,409))
     if(name){
          const nameexist=await Category.findOne({name , _id:{$ne: req.params.categoryId}})
          if(nameexist) return next(new AppError(messages.category.alreadyExists,409))
          categoryexist.name=name
          categoryexist.slug=slugify(name)
          }  
     if(req.file){
          cloudinary.uploader.destroy(categoryexist.logo.public_id)
          const { secure_url, public_id}= await cloudinary.uploader.upload(req.file.path,{
               public_id: categoryexist.logo.public_id
          })
          categoryexist.logo={ secure_url, public_id}
     }
     const updatecategory= await categoryexist.save()
     
     if(!updatecategory) return next(new AppError(messages.category.failToupdate,409))
     return res.json({message:messages.category.updated, 
                      success:true,
                      data:updatecategory})
})

export const deletecategory= catchError(async( req, res, next)=>{
     const category= await Category.findById(req.params.categoryId).populate([
             { path: "products",select: " imageCover images" },
             { path: "subcategories", select:"_id"}
     ])   
     console.log(category);
     
     if(!category) return next(new AppError(messages.category.notFound,404))
     let subcategoriesids= []
     let productids= []
     let imageproduct= []
     
     for (let index = 0; index < category.subcategories.length; index++) {
          subcategoriesids.push(category.subcategories[index])
     }
     for (const product of category.products) {
          productids.push(product._id)
          imageproduct.push(product.imageCover.public_id)
          product.images.forEach((image)=>{
               imageproduct.push(image.public_id)
          })
     }    
     await SubCategory.deleteMany({ _id: { $in: subcategoriesids} })
     await Product.deleteMany({ _id: { $in: productids} })
     await cloudinary.uploader.destroy(category.image.public_id) 
     for (const public_id of imageproduct) {
       await cloudinary.uploader.destroy(public_id)   
     }
     await Category.findByIdAndDelete(req.params.categoryId)
     return res.json({
          message:messages.category.deleted,
          success:true
     })
})