import joi from 'joi'
import { generalFields } from '../../middleware/validate.js'

export const addToCartVal= joi.object({
    productId:generalFields.objectId.required(),
    quantity: joi.number
}).required()

export const deleteFromCartVal= joi.object({
    id: generalFields.objectId.required()
})
