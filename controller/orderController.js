import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"



// placing order using cod method
 export const placeOreder =async (req,res)=>{
    try {
        const {userId,items,amount,address}=req.body
        const orderData= {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        const  newOrder = orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:'place order'})
    } catch (error) {
        console.log(error)
                res.json({success:true,message:error.message})

    }
}
// placing order using Stripe  method
export const placeOrederStripe =async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
// placing order using Razorpay method
export const placeOrederRazorpay =async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}


//  All orders data from admin panel
export const allOrders =async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

//  user order data from frontend
export const userOrders =async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}


// update order status from admin panel
export const updateStatus =async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}