import joi from 'joi'
import { generalFields } from '../../middleware/validate.js'

export const addSubCategoryVal= joi.object({
    name: generalFields.name.required(),
    category: generalFields.objectId.required(),
    createdBy: generalFields.objectId.required()
}).required()

export const updateSubCategoryVal= joi.object({
    name:generalFields.name,
    category:generalFields.objectId,
    subCategoryId: generalFields.objectId.required()
})
export const getanddeleteSubCategoryVal=joi.object({
    subCategoryId: generalFields.objectId.required()
}).required()