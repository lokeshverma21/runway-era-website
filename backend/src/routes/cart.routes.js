import {Router} from "express";
import { addToCart, getUserCart, removeFromCart, updateCart } from "../controllers/cart.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add").post(verifyJWT,addToCart)
router.route("/update").post(verifyJWT,updateCart)
router.route("/get").get(verifyJWT,getUserCart)
router.route("/remove").post(verifyJWT,removeFromCart)

export default router;