import { dbConn } from '../../database/dbConnection.js'
import { globalError } from '../middleware/globalError.js'
import { AppError } from '../utils/appError.js'
import * as allRouters from '../index.js'

export const bootstrap = (app) => {
    process.on("uncaughtException", (err) => {
      console.log("ERROR in code: ", err);
    })    



app.use('/category',allRouters.categoryRouter)
app.use('/subcategory',allRouters.subcategoryRouter)
app.use('/brand',allRouters.brandRouter)
app.use('/product',allRouters.productRouter)
app.use('/auth',allRouters.authRouter)
app.use('/review',allRouters.reviewRouter)
app.use('/wishlist', allRouters.wishlistRouter)
app.use('/cart', allRouters.cartRouter)
app.use('/coupon', allRouters.couponRouter)
app.use('/order', allRouters.orderRouter)
app.use('/user', allRouters.userRouter)


app.use('*',(req,res,next)=>{
    next(new AppError(`route not found : ${req.originalUrl}`,400))
})

app.use(globalError)

process.on("unhandledRejection", (err) => {
    console.log("ERROR: ", err);
  });
};