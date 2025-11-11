import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { loginMiddleware, registerMiddleware, validateFields } from "../middlewares/auth.js";
import passport from "passport";
import { body } from "express-validator";

export const router = Router()

router.post('/register',[
        body('email')
            .isEmail()
            .withMessage('Invalid email format'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('the password must be at least 6 characters long'),
        body('first_name')
            .isLength({ min: 3, max: 20 })
            .withMessage("The name must be between 3 and 20 characters")
            .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
            .withMessage("The name can only contain letters and spaces"),
            validateFields,
            registerMiddleware
], AuthController.register)

router.post('/login',[
    body('email')
        .isEmail()
        .withMessage('Invalid credentials'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Invalid credentials'),
    validateFields,
    loginMiddleware
], AuthController.login)

router.post('/logout', passport.authenticate('current', { session: false }), AuthController.logout)
