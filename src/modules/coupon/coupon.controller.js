import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { messages } from "../../utils/constant/messages.js"
import { Coupon } from "../../../database/index.js"

export const createCoupon = catchError(async( req, res, next)=>{
     let { code, discount, couponType, fromDate, toDate } = req.body
     const couponExist = await Coupon.findOne({ code })
     if(couponExist) return next(new AppError(messages.coupon.alreadyExists,409))
          console.log(req.body.couponType);
          
          if (couponType !== 'fixedAmount' && couponType !== 'percentage') {
               return next(new AppError('Invalid coupon type', 400));
           }
       
     if(couponType == 'percentage' && discount > 100) return next(new AppError('must between 0 , 100',400))
     const createdcoupon =  await Coupon.create({
           code,
           discount,
           couponType,
           fromDate,
           toDate, 
           createdBy: req.authUser._id
})
     return res.json({message: messages.coupon.created,
                      success:true,
                      data: createdcoupon})
})

export const getCoupons= catchError(async( req, res, next)=>{
     const coupon= await Coupon.find()
     coupon || next(new AppError(messages.coupon.notFound,404))
     !coupon || res.json({success:true,coupon})
})

export const getCoupon= catchError( async( req, res, next)=>{
     const coupon= await Coupon.findById(req.params.id)
     coupon || next(new AppError(messages.coupon.notFound,404))
     !coupon || res.json({success:true,coupon})
})

export const deleteCoupon= catchError(async( req, res, next)=>{
     const coupon= await Coupon.findByIdAndDelete(req.params.id)
     if(!coupon){ 
          return next(new AppError(messages.coupon.notFound,404))
     }
     return res.json({message:messages.coupon.deleted,coupon})
})