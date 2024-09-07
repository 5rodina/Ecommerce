import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateproduct } from "./product.controller.js";
import { cloudUpload } from "../../utils/constant/multer-cloud.js";
import { validate } from "../../middleware/validate.js";
import {  addProductVal, getanddeleteProductVal, updateProductVal } from "./product.validation.js";
import { roles } from "../../utils/constant/enum.js";
import { authentication } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";


const productRouter=Router()

productRouter
  .post('/',authentication(), isAuthorized([roles.ADMIN,roles.SELLER]),
  (cloudUpload({}).fields([
    {name: "imageCover",maxCount:1},
    {name: "images" , maxCount:5}
  ])), validate(addProductVal),
  addProduct)
  .get('/',getProducts)

productRouter 
  .route('/:id')
  .get(validate(getanddeleteProductVal),getProduct)
  .put(authentication(), isAuthorized([roles.ADMIN,roles.SELLER])
  ,validate(updateProductVal),updateproduct)
  .delete(authentication(), isAuthorized([roles.ADMIN]),
    validate(getanddeleteProductVal),deleteProduct)

  
export default productRouter