import express from 'express';
import { 
  placeOreder, 
  // placeOrederRazorpay, 
  placeOrederStripe, 
  allOrders, 
  userOrders, 
  updateStatus,
  verifyStripe 
} from '../controller/orderController.js';

const orderRouter = express.Router();

import  adminAuth  from '../middleware/AdminAuth.js';
import { authUser } from '../middleware/auth.js';
import Stripe from 'stripe';

// admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// payment features
orderRouter.post('/place', authUser, placeOreder);
orderRouter.post('/stripe', authUser, placeOrederStripe);
// orderRouter.post('/razorpay', authUser, placeOrederRazorpay);

// user feature
orderRouter.post('/userOrders', authUser, userOrders);



// verify Stripe
orderRouter.post('/verifyStripe', authUser, verifyStripe );

export default orderRouter;
