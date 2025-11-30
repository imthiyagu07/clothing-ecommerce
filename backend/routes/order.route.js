import express from 'express';
import {createOrder,getUserOrders,getOrderById,getAllOrders,updateOrderStatus} from '../controllers/order.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes
router.use(protect);

// User routes
router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);

// Admin routes
router.get('/admin/all', admin, getAllOrders);
router.put('/:id/status', admin, updateOrderStatus);

export default router;