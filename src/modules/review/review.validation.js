import joi from 'joi'
import { generalFields } from '../../middleware/validate.js'

export const addReviewVal= joi.object({
    product: generalFields.objectId.required(),
    rate: generalFields.rate.required(),
    comment: generalFields.name.required()
    
}).required()

export const getAndDeleteReviewVal=joi.object({
    id: generalFields.objectId.required()
}).required()