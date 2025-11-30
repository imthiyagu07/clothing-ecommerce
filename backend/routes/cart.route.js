import express from 'express';
import {getCart,addToCart,updateCartItem,removeFromCart,clearCart,syncCart} from '../controllers/cart.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes
router.use(protect)

// All cart routes require authentication
router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/remove', removeFromCart);
router.delete('/clear', clearCart);
router.post('/sync', syncCart);

export default router;