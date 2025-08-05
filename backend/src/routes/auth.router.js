import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import passport from "passport";
import { loginMiddleware, registerMiddleware } from "../middlewares/auth.js";

export const router = Router()

router.post('/register',registerMiddleware,AuthController.register)

router.post('/login',loginMiddleware,AuthController.login)
