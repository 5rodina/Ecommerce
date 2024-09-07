
import { AppError } from "../utils/appError.js"
import joi from 'joi'

const parseArray=(value,helper)=>{
  let paresedvalue = JSON.parse(value)
  let schema = joi.array().items(joi.string())
  const { error } = schema.validate(paresedvalue,{ abortEarly:false })
  if(error) return helper('invalid data')
  return true
}
export const generalFields={
    name: joi.string(),
    objectId: joi.string().hex().length(24),
    description:joi.string().max(100),
    price:joi.number().min(0),
    discount:joi.number().min(0).max(100),
    colors: joi.custom(parseArray),
    size:joi.custom(parseArray),
    stock:joi.number().min(1),
    rate: joi.number().min(1).max(5)
}
export const validate=(schema)=>{
    return (req,res,next)=>{
        let {error}= schema.validate({...req.body,...req.params,...req.query},{ abortEarly : false})
        if(!error){
            next()
        }else{
            let errMsgs=error.details.map(err=>err.message)
            next(new AppError(errMsgs,401))
        }
    }
}