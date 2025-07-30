import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import passport from "passport";

export const router = Router()

router.post('/register',passport.authenticate('register',{session:false}),AuthController.register)

router.post('/login', passport.authenticate('login',{session:false}),AuthController.login)