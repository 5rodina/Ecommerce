import { Router } from "express";
import { authentication } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { addToWishlist, deleteFromWishlist, getWishlist } from "./wishlist.controller.js";
import { validate } from "../../middleware/validate.js";
import { addToWishlistVal, deleteFromWishlistVal } from "./wishlist.validation.js";

const wishlistRouter=Router()
wishlistRouter.post('/', authentication(), 
        isAuthorized(roles.USER),
        validate(addToWishlistVal),addToWishlist )

wishlistRouter
  .get('/', authentication(), isAuthorized(roles.USER), getWishlist)

wishlistRouter 
  .delete('/:productId', authentication(), 
  isAuthorized(roles.USER), 
  validate(deleteFromWishlistVal),deleteFromWishlist)
  
export default wishlistRouter