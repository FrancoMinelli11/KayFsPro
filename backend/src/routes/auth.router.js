import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { loginMiddleware, registerMiddleware, validateFields } from "../middlewares/auth.js";
import passport from "passport";
import { body } from "express-validator";

export const router = Router()

router.post('/register',[
        body('email')
            .isEmail()
            .withMessage('Formato de email inválido'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('La contraseña debe tener al menos 6 caracteres'),
        body('first_name')
            .isLength({ min: 3, max: 20 })
            .withMessage("El nombre debe tener entre 3 y 20 caracteres")
            .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
            .withMessage("El nombre solo puede contener letras y espacios"),
            validateFields,
            registerMiddleware
], AuthController.register)

router.post('/login',[
    body('email')
        .isEmail()
        .withMessage('Formato de email inválido'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    validateFields,
    loginMiddleware
], AuthController.login)

router.post('/logout', passport.authenticate('current', { session: false }), AuthController.logout)
