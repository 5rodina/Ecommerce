import { Router } from "express";
import { deletedAccount } from "./user.controller.js";
import { authentication } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";

const userRouter = Router()

userRouter.get('/', authentication(),
      isAuthorized([roles.USER]),deletedAccount)

export default userRouter