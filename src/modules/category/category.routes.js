import { Router } from "express";
import { addCategory, deletecategory, getcategories, getcategory, updatecategory } from "./category.controller.js";
import { cloudUpload } from "../../utils/constant/multer-cloud.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryVal, getanddeleteCategoryVal } from "./category.validation.js";
import { authentication } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";

const categoryRouter=Router({ mergeParams: true})


categoryRouter
  .route('/')
  .post(authentication(), isAuthorized([roles.ADMIN]),
  cloudUpload({}).single('image'),validate(addCategoryVal),addCategory)
  .get(getcategories)


  categoryRouter.get('/:categoryId',validate(getanddeleteCategoryVal),getcategory)

categoryRouter 
  .route('/:categoryId')
  .put(authentication(), isAuthorized([roles.ADMIN,roles.SELLER]),
  cloudUpload({}).single('image'),updatecategory)
  .delete(authentication(), isAuthorized([roles.ADMIN]),validate(getanddeleteCategoryVal),deletecategory)

  
export default categoryRouter