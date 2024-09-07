import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { messages } from "../../utils/constant/messages.js"
import { Product, Review } from "../../../database/index.js"


export const addReview = catchError(async( req, res, next)=>{
     let {product, rate, comment} = req.body
     
     const review=new Review({
          user: req.authUser._id,
          product,
          rate,
          comment
     })
     const createdReview = await review.save()
     const rating = await Review.find({product}).select('rate')
     let avgRate = rating.reduce((acc, cur) => {
          return acc += cur.rate
     },0)
     avgRate = avgRate/ rating.length

     await Product.findByIdAndUpdate(product, { rate: avgRate})
     return res.json({message: messages.review.created,
                      success:true,
                      data: avgRate})
})

export const getaReviews= catchError(async( req, res, next)=>{
     const review= await Review.find()
     review || next(new AppError(messages.review.notFound,404))
     !review || res.json({success:true, data:review})
})


export const getReview= catchError( async( req, res, next)=>{
     const review= await Review.find({ product: req.params.id})
     review || next(new AppError(messages.review.notFound,404))
     !review || res.json({success:true,review})
})


export const deleteReview= catchError(async( req, res, next)=>{
     const reviewExist= await Review.findById(req.params.id)
    
     if(!reviewExist) return next( new AppError( messages.review.notFound, 404)) 
     if(req.authUser._id.toString() != reviewExist.user.toString()) return next( new AppError( messages.user.notFound, 401))
     
     await Review.deleteOne({ _id: req.params.id })
     return res.json({message:messages.review.deleted,
          success:true
     })
})