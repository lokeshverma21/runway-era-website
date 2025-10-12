import {Router} from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { dashboard } from "../controllers/dashboard.controller.js";
import adminAuth from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/").get(adminAuth,dashboard)

export default router;