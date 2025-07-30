import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { uploader } from "../utils/utils.js";

export const router = Router()

router.post('/',uploader.single('thumbnail'), ProductController.createProduct)