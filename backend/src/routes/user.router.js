import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import passport from "passport";

export const router = Router()

router.get('/', passport.authenticate('current', { session: false }), UserController.getAllUsers)