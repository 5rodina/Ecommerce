import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { authentication } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { addCouponVal, getAndDeleteCouponVal } from "./coupon.validation.js";
import { createCoupon, deleteCoupon, getCoupon, getCoupons } from "./coupon.controller.js";


const couponRouter=Router()
couponRouter.post('/', authentication(),
                       isAuthorized([roles.ADMIN]),
                        validate(addCouponVal), createCoupon )
couponRouter
  .get('/', getCoupons)

couponRouter 
  .route('/:id')
  .get(authentication(),
  isAuthorized([roles.ADMIN]),
   validate(getAndDeleteCouponVal), getCoupon)
  .delete(authentication(),
  isAuthorized([roles.ADMIN]),
   validate(getAndDeleteCouponVal), deleteCoupon)

  
export default couponRouter