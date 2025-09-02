import express from 'express'
import { addProduct, removeProduct, listProduct, singleProduct } from '../controller/prodectController.js'
import upload from '../middleware/multer.js'

const producterRoute = express.Router()

// make sure frontend se bhi field name image1, image2, image3, image4 hi bheje
producterRoute.post(
  '/add',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),
  addProduct
)


producterRoute.post('/remove', removeProduct)
producterRoute.post('/single', singleProduct)
producterRoute.get('/list', listProduct)

export default producterRoute
