import express from 'express'
import {addToCart,getUserCart,updateCart} from '../controller/cartController.js'
import { authUser } from '../middleware/auth.js'
const cartRoute = express.Router()
cartRoute.post('/get',authUser,getUserCart)
cartRoute.post('/update',authUser,updateCart)
cartRoute.post('/add',authUser,addToCart)


export default  cartRoute;