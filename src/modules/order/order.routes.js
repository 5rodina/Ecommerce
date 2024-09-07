import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { roles } from "../../utils/constant/enum.js";
import { authentication } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { cancelOrderVal, createOrderVal } from "./order.validation.js";
import { cancelOrder, createOrder, getUserOrders } from "./order.controller.js";


const orderRouter=Router()

orderRouter
  .post('/',authentication(), isAuthorized([roles.USER]),
   validate(createOrderVal),createOrder )
  .get('/',authentication(), isAuthorized([roles.USER]),
   getUserOrders)

orderRouter
  .delete('/:id', authentication(), isAuthorized([roles.USER]),
   validate(cancelOrderVal), cancelOrder)

  
export default orderRouter