import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { uploader } from "../utils/utils.js";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth.js";

export const router = Router()

router.post('/',uploader.single('thumbnail'),passport.authenticate('current', { session: false }), authMiddleware, ProductController.createProduct)