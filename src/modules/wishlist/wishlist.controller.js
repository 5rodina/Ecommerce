import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { messages } from "../../utils/constant/messages.js"
import { User } from "../../../database/index.js"

export const addToWishlist = catchError(async( req, res, next)=>{
     let { productId } = req.body
     const wishlist= await User.findByIdAndUpdate(req.authUser._id, { $addToSet : { wishlist: productId}} , { new : true})
     return res.json({message: `${productId} added to wishlist successfully`,
                      success:true,
                      data: wishlist})
})

export const getWishlist= catchError(async( req, res, next)=>{
     const user = await User.findById(req.authUser._id, { wishlist: 1 },{populate:[{ path: 'wishlist'}]})
     return res.json({
          success:true,
          data: user})
})  

export const deleteFromWishlist= catchError(async( req, res, next)=>{
     let { productId } = req.params
     const wishlist= await User.findByIdAndUpdate(req.authUser._id, { $pull : { wishlist: productId}} ).select('wishlist')
     return res.json({message: 'product removed successffully',
                      success:true,
                      data: wishlist})
})