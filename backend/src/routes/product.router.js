import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { uploader } from "../utils/utils.js";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth.js";

export const router = Router()

router.post('/',uploader.single('thumbnail'),passport.authenticate('current', { session: false }), authMiddleware, ProductController.createProduct)
router.get('/', ProductController.getAllProducts)
router.get('/:pid', ProductController.getProductById)
router.put('/:pid', uploader.single('thumbnail'), passport.authenticate('current', { session: false }), authMiddleware, ProductController.updateProduct)
router.delete('/:pid', passport.authenticate('current', { session: false }), authMiddleware, ProductController.deleteProduct)