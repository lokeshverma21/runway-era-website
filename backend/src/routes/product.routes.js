import { Router } from "express";
import { addProduct, listProduct, removeProduct, singleProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import adminAuth from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/add").post(adminAuth,upload.fields([
    {name: "image1", maxCount:1},
    {name: "image2", maxCount:1},
    {name: "image3", maxCount:1},
    {name: "image4", maxCount:1},
]),addProduct)

router.route("/list").get(listProduct)
router.route("/remove").post(adminAuth,removeProduct)
router.route("/single").post(singleProduct)

export default router;