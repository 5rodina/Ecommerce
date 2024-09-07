import Stripe from "stripe";
import { Cart, Coupon, Order, Product } from "../../../database/index.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { messages } from "../../utils/constant/messages.js";
import { orderStatus } from "../../utils/constant/enum.js";

export const createOrder= catchError(async(req,res,next) => {
    const { phone , street, coupon, paymentMethod } =req.body
    let couponExist = ''
    if(coupon){
        couponExist = await Coupon.findOne({ code: coupon})
        if(!couponExist) return next(new AppError(messages.coupon.notFound, 404))
    }
    const cart = await Cart.findOne({ user: req.authUser._id })
    if(!cart) return next(new AppError('dont have cart', 400))
    const products = cart.products
    let orderProducts = []
    let orderPrice=0
    for(const productt of products){
        const productExist= await Product.findById(productt.product)
        if(!productExist) return next(new AppError(messages.product.notFound, 404))
        if(!productExist.inStock(productt.quantity)) return next(new AppError( 'out of stock ', 404))
        orderPrice += productExist.finalPrice * productt.quantity
        orderProducts.push({
            product:productExist._id,
            price: productExist.price,
            finalPrice: productExist.finalPrice,
            quantity: productt.quantity,
            discount: productExist.discount,
            name: productExist.name 
         })
        }

    const order = new Order({
        user: req.authUser._id,
        address: { phone , street },
        coupon: {
            couponId: couponExist._id,
            code: coupon, 
            discount: couponExist.discount
        },
        paymentMethod,
        products: orderProducts,
        orderPrice,
        finalPrice: orderPrice - (orderPrice * ((couponExist.discount || 0) / 100 )),
        status:orderStatus.PLACED

    })
    const createdOrder= await order.save()
    if(paymentMethod == 'visa'){
        const stripe = new Stripe('sk_test_51PwBGMAGSzASvCSxQrfe5ykkFJl7F60U3zs9etzde8WarYTGGHeAXOooS7ozJeaHqx650tgN44vp0hHQ65o3wWNa00Gddj41vF')
        const checkout = await stripe.checkout.sessions.create({
            success_url: "https://www.google.com",
            cancel_url: "https://www.facebook.com",
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: createdOrder.products.map((product) => {
                return {
                    price_data: {
                        currency: 'egp',
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.finalPrice * 100
                    },
                    quantity: product.quantity
                }
            })
            
        })
        return res.json({ message: messages.order.created,
            success:true,
            data: createdOrder,
            url: checkout.url
})
    }
    return res.json({ message: messages.order.created,
        success:true,
        data: createdOrder
 
 })
})

export const getUserOrders = catchError(async (req, res, next) => {
    const orders = await Order.find({ user: req.authUser._id });
    if (!orders || orders.length === 0)
      return next(new AppError(messages.order.notFound, 404));
  
    return res.status(200).json({
      success: true,
      data: orders,
    });
  });

export const cancelOrder = catchError(async (req, res, next) => {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: orderStatus.CANCELED },
      { new: true }
    );
    if (!order) return next(new AppError(messages.order.notFound, 404));
  
    return res.status(200).json({
      message: messages.order.deleted,
      success: true,
      data: order,
    });
  });
  