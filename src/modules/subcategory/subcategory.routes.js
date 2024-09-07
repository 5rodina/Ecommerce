import { Router } from "express";
import { addSubCategory, deleteSubCategory, getAllSubCategory, getSubCategory, updateSubCategory } from "./subcategory.controller.js";
import { validate } from "../../middleware/validate.js";
import { addSubCategoryVal, getanddeleteSubCategoryVal, updateSubCategoryVal } from "./subcategory.validation.js";
import categoryRouter from "../category/category.routes.js";
import { roles } from "../../utils/constant/enum.js";
import { authentication } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";


const subcategoryRouter=Router()


subcategoryRouter
  .route('/')
  .post(authentication(), isAuthorized([roles.ADMIN,roles.SELLER]),
  validate(addSubCategoryVal),addSubCategory)
  .get(getAllSubCategory)

subcategoryRouter 
  .route('/:subCategoryId')
  .get(validate(getanddeleteSubCategoryVal),getSubCategory)
  .put(authentication(), isAuthorized([roles.ADMIN,roles.SELLER]),validate(updateSubCategoryVal),updateSubCategory)
  .delete(authentication(), isAuthorized([roles.ADMIN ]),validate(getanddeleteSubCategoryVal),deleteSubCategory)

subcategoryRouter.use('/:categoryId',categoryRouter)  

export default subcategoryRouter