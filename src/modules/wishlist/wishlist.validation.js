import joi from 'joi'
import { generalFields } from '../../middleware/validate.js'

export const addToWishlistVal= joi.object({
    productId: generalFields.objectId.required()
}).required()

export const deleteFromWishlistVal= joi.object({
    productId: generalFields.objectId.required()
})

