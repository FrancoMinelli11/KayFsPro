import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export const router = Router()

router.get('/', UserController.getAllUsers)