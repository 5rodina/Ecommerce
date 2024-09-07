import joi from 'joi'
import { generalFields } from '../../middleware/validate.js'

export const addBrandVal= joi.object({
    name:generalFields.name.required(),
    createdBy: generalFields.objectId.required()
}).required()

export const updateBrandVal= joi.object({
    name:generalFields.name,
    brandId: generalFields.objectId.required()
})
export const getanddeleteBrandVal=joi.object({
    brandId: generalFields.objectId.required()
}).required()