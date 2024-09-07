import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { authentication } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { addToCart, deleteFromCart, getAllItems } from "./cart.controller.js";
import { deleteFromCartVal } from "./cart.validation.js";


const cartRouter=Router()
cartRouter.post('/', authentication(), 
                     isAuthorized([roles.USER]), addToCart)
cartRouter
  .get('/',authentication(), 
  isAuthorized([roles.USER]),getAllItems)

cartRouter 
  .route('/:id')
  .delete(authentication(), 
  isAuthorized([roles.USER]), validate(deleteFromCartVal), deleteFromCart)

  
export default cartRouter