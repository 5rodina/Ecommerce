import joi from 'joi'
import { generalFields } from '../../middleware/validate.js'
import { couponType } from '../../utils/constant/enum.js'

export const addCouponVal= joi.object({
    code:generalFields.name.required(),
    discount: generalFields.discount.positive(),
    couponType: joi.string().valid(...Object.values(couponType)).required(),
    fromDate: joi.date().greater(Date.now() - (24 * 60 * 60 * 1000)).required(),
    toDate: joi.date().greater(joi.ref('fromDate'))
}).required()

export const getAndDeleteCouponVal= joi.object({
    id: generalFields.objectId.required()
})

