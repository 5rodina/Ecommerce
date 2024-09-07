import joi from 'joi'
import { generalFields } from '../../middleware/validate.js'

export const addCategoryVal= joi.object({
    name:generalFields.name.required(),
}).required()

export const updateCategoryVal= joi.object({
    name:generalFields.name,
    categoryId: generalFields.objectId.required()
})
export const getanddeleteCategoryVal=joi.object({
    categoryId: generalFields.objectId.required()
}).required()