import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { SubCategory } from "../../../database/models/subcategory.model.js"
import { Category } from "../../../database/models/category.model.js"
import { messages } from "../../utils/constant/messages.js"


export const addSubCategory = catchError(async( req, res, next)=>{
     let {name , category, createdBy} = req.body
     name=name.toLowerCase()
     const categoryExist= await Category.findById(category)
     if(!categoryExist) return next(new AppError(messages.category.notFound,409))
    
     const nameExist= await SubCategory.findOne({name , category})
     if(nameExist) return next(new AppError(messages.subCategory.alreadyExists,409))
     let slug=slugify(name)
     const subcategory=new SubCategory({
          name,
          slug,
          category,
          createdBy
     })
     const createdsubcategory= await subcategory.save()
     if(!createdsubcategory) return next(new AppError(messages.subCategory.failToCreate,500))
     return res.json({message:messages.subCategory.created,
                      success:true, 
                      data:createdsubcategory})
})

export const getAllSubCategory= catchError(async( req, res, next)=>{
     const subCategory= await SubCategory.find()
     res.json({success:true,data:subCategory})
})

export const getSubCategory= catchError( async( req, res, next)=>{
     const subCategory= await SubCategory.findById(req.params.subCategoryId)
     subCategory || next(new AppError(messages.subCategory.notFound,404))
     !subCategory || res.json({success:true,subCategory})
})

export const updateSubCategory= catchError(async( req, res, next   )=>{
     let {name}=req.body
     name=name.toLowerCase()

     const subcategoryExist=await SubCategory.findById(req.params.subCategoryId)
     console.log(subcategoryExist);
     
     if(!subcategoryExist) return next(new AppError(messages.subCategory.notFound,409))
     if(name){
          const nameexist=await SubCategory.findOne({name , _id:{$ne: req.params.subCategoryId}})
          if(nameexist) return next(new AppError(messages.subCategory.alreadyExists,409))
          subcategoryExist.name=name
          subcategoryExist.slug=slugify(name)
}
     const updatesubcategory= await subcategoryExist.save()
     if(!updatesubcategory) return next(new AppError(messages.subCategory.failToupdate,409))
     return res.json({message:messages.subCategory.updated, 
                 success:true,
                 data:updatesubcategory})
})

export const deleteSubCategory= catchError(async( req, res, next)=>{
     const subCategory= await SubCategory.findByIdAndDelete(req.params.subCategoryId)
     subCategory || next(new AppError(messages.subCategory.notFound,404))
     !subCategory || res.json({message:messages.subCategory.deleted,subCategory})
})