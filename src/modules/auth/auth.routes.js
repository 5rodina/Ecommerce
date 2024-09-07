import { Router } from "express";
import { login, signup, verifyAcount } from "./auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { loginVal } from "./auth.validation.js";

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.get('/verify', verifyAcount)
authRouter.post('/login', validate(loginVal),login)
export default authRouter