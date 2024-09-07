import joi from 'joi'
import { generalFields } from '../../middleware/validate.js'

export const addProductVal= joi.object({
    name:generalFields.name.required(),
    description:generalFields.description.required(),
    category:generalFields.objectId.required(),
    subcategory:generalFields.objectId.required(),
    brand:generalFields.objectId.required(),
    price:generalFields.price.required(),
    discount:generalFields.discount.optional(),
    colors:generalFields.colors,
    size:generalFields.size,
    stock:generalFields.stock,
}).required()

export const updateProductVal= joi.object({
    price:joi.number(),
    stock:joi.number(),
    id: generalFields.objectId.required()
})
export const getanddeleteProductVal=joi.object({
    id: generalFields.objectId.required()
}).required()