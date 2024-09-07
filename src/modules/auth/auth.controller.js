import { Cart, User } from "../../../database/index.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import { sendEmail } from "../../utils/constant/email.js"
import { status } from "../../utils/constant/enum.js"
import { messages } from "../../utils/constant/messages.js"
import { comparePassword, hashPassword } from "../../utils/constant/password.js"
import { generateToken, verifyToken } from "../../utils/constant/token.js"


export const signup = catchError(async (req, res, next) => {
    const { userName, phone, email, password, DOB } = req.body
    const userExist = await User.findOne({ $or: [{ email }, { phone} ]})
    if(userExist) return next(new AppError(messages.user.alreadyExists,409))
    console.log(password);
    
    const hashPasswordd= hashPassword({ password })
    console.log(hashPasswordd);
    
    const user = new User({
        userName,
        email,
        phone,
        password:hashPasswordd,
        DOB
    })
    
    const createduser= await user.save()
    if(!createduser) return next(new AppError(messages.user.failToCreate))
    const token= generateToken({ payload :{ email}})
    await sendEmail({ to: email, subject:"verify", html:`<P> verify
         <a href='${req.protocol}://${req.headers.host}/auth/verify?token=${token}'> link</a></P>`})
    return res.json({
         message: messages.user.created,
         success: true,
         data: createduser
    })
})
export const verifyAcount = catchError(async (req, res, next) => {
    const { token } =req.query
    const payload = verifyToken({token })
    const user = await User.findOneAndUpdate({ email:payload.email, status: status.PENDING},{ status: status.VERIFIED},{ new: true})
    await Cart.create({ user: user._id, products: [] })
    return res.json({ message:"verified successfully"})
   })

export const login = catchError(async (req, res, next) => {
    const { email, phone, password}= req.body
    const userExist = await User.findOne({ $or: [{ email }, { phone }], status: status.VERIFIED})
    if(!userExist) return next(new AppError('invalid credintials', 401))
    
    const isMatch= comparePassword({password, hashPassword: userExist.password})
    if(!isMatch) return next(new AppError('invalid credintials', 401))
    userExist.isDeleted = false
    await userExist.save()
    const token = generateToken({ payload: {email} })
    return res.json({ message:'welcome', 
                      success: true,
                      accessToken: token
    })
  })