import express from 'express'
import {userLogin,registerUser,adminLogin} from '../controller/userController.js'
const userRouter =express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.post('/admin',adminLogin)

export default userRouter;