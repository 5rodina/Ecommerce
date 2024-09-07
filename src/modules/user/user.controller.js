import { User } from "../../../database/index.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"



export const deletedAccount = catchError(async (req, res, next) => {
    const userId = req.authUser._id
    const user = await User.findByIdAndUpdate(userId, { isDeleted: true},{new:true})
    if(!user) return next(new AppError(messages.user.notFound))
    return res.json({
         message: messages.user.deleted,
         success: true,
         data: user
    })
})
