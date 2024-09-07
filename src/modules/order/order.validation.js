import joi from 'joi'
import { paymentMethod } from '../../utils/constant/enum.js'
import { generalFields } from '../../middleware/validate.js'

export const createOrderVal = joi.object({
    phone: joi.string(),
    street: joi.string(),
    paymentMethod: joi.string().valid(...Object.values(paymentMethod)),
    coupon: joi.string()
})

export const cancelOrderVal= joi.object({
    id: generalFields.objectId.required()
})

