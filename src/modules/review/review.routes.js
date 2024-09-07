import { Router } from "express";
import { authentication } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { addReview, deleteReview, getaReviews, getReview } from "./review.controller.js";
import { validate } from "../../middleware/validate.js";
import { addReviewVal,  getAndDeleteReviewVal } from "./review.validation.js";

const reviewRouter=Router()
reviewRouter.post('/', authentication(), 
    isAuthorized(roles.USER),validate(addReviewVal), 
    addReview)

reviewRouter
  .get('/', getaReviews)

reviewRouter 
  .delete('/:id', authentication(), 
  isAuthorized(roles.USER),validate(getAndDeleteReviewVal),
  deleteReview)
  .get('/:id',authentication(), isAuthorized(roles.ADMIN),
  validate(getAndDeleteReviewVal),
  getReview)
  
export default reviewRouter