import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { messages } from "../../utils/constant/messages.js"
import { Cart, Product } from "../../../database/index.js"

export const addToCart = catchError(async( req, res, next)=>{
     let {productId, quantity} = req.body
     const productExist = await Product.findById(productId)
     if(!productExist) return next(new AppError(messages.product.notFound,404))
     if(productExist.stock<quantity)  return next(new AppError('out of stock',400))
     let data = ''
     const productInCart = await Cart.findOneAndUpdate({ 
         user: req.authUser._id, 'products.product': productId},
     { $set: { 'products.$.quantity': quantity}}, { new: true})
     let message = messages.cart.updated
     data = productInCart
     if(!productInCart){
          const cart = await Cart.findOneAndUpdate(
               { user: req.authUser._id },
               { $push: { products: { product: productId, quantity } } }, // Corrected field name
               { new: true }
           );
          message = 'product added to cart'
          data = cart
     }
     return res.json({message,
                      success:true,
                      data})
})
export const deleteFromCart = catchError(async( req, res, next)=>{
          const { id} = req.params
          const productInCart = await Cart.findOne({ 
          user: req.authUser._id, 'products.product': id})
          if(!productInCart) return next(new AppError(messages.product.notFound,404))
          const cart = await Cart.findOneAndUpdate({ user: req.authUser._id}, { $pull: { products: {product: id}} }, { new: true})
     return res.json({message: messages.cart.deleted,
                      success:true,
                      data: cart})
})
export const getAllItems = catchError(async( req, res, next)=>{
     const productInCart = await Cart.find({ 
     user: req.authUser._id})
     if(!productInCart) return next(new AppError("cart is empty",404))
return res.json({
                 success:true,
                 data: productInCart})
})

