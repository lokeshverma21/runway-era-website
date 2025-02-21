import express,{Router} from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrder, verifyStripe } from "../controllers/order.controller.js";
import adminAuth from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/place-order").post(verifyJWT,placeOrder)
router.route("/place-order-stripe").post(verifyJWT,placeOrderStripe)
router.route("/place-order-razorpay").post(verifyJWT,placeOrderRazorpay)

router.route("/userorder").get(verifyJWT, userOrder)

//admins
router.route("/list").get(adminAuth, allOrders)
router.route("/status").post(adminAuth, updateStatus)

//verify payment
router.route("/verifyStripe").post(verifyJWT, verifyStripe)
// router.route("/stripe-webhook").post(express.raw({ type: "application/json" }), webhookStripe);

export default router