import { User } from "../../database/index.js"
import { AppError } from "../utils/appError.js"
import { status } from "../utils/constant/enum.js"
import { messages } from "../utils/constant/messages.js"
import { verifyToken } from "../utils/constant/token.js"


export const authentication = () => {
    return async (req, res, next) => {
        const { token } = req.headers
        let result= verifyToken({token, secretKey:'koko'})
        if(result.message) return next(new AppError(result.message))
        const user = await User.findOne({ email:result.email, status: status.VERIFIED})  
        if(!user) return next(new AppError(messages.user.notFound,404))
        req.authUser=user
        next()
    }
}