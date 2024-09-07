import { Router } from "express";
import { addBrand, deleteBrand, getBrand, getBrands, updateBrand } from "./brand.controller.js";
import { cloudUpload } from "../../utils/constant/multer-cloud.js";
import { validate } from "../../middleware/validate.js";
import { addBrandVal, getanddeleteBrandVal, updateBrandVal } from "./brand.validation.js";
import { authentication } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";


const brandRouter=Router()
brandRouter.post('/',authentication(), isAuthorized([roles.ADMIN,roles.SELLER]),
  cloudUpload({}).single('logo'), validate(addBrandVal) ,addBrand
)
brandRouter
  .get('/',getBrands)

brandRouter 
  .route('/:brandId')
  .get(validate(getanddeleteBrandVal),getBrand)
  .put(authentication(), isAuthorized([roles.ADMIN,roles.SELLER]),
     cloudUpload({}).single('logo'), validate(updateBrandVal),updateBrand)
  .delete(authentication(), isAuthorized([roles.ADMIN ]),
  validate(getanddeleteBrandVal),deleteBrand)

  
export default brandRouter