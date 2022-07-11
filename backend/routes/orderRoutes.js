import express from "express"
const router = express.Router()
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToPaid } from "../controllers/orderController.js"
import {protect, admin} from "../middlewear/authMiddleware.js"

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/myorders/:id").get(protect, getMyOrders)

export default router