import express from 'express'
import { CartController } from '../controllers/cart.controller.js'
import passport from 'passport'
export const router = express.Router()

router.get('/', passport.authenticate('current', { session: false }), CartController.getCart)
router.put('/', passport.authenticate('current', { session: false }), CartController.addToCart)
router.delete('/:productId', passport.authenticate('current', { session: false }), CartController.deleteProduct)
router.put('/clear', passport.authenticate('current', { session: false }), CartController.clearCart)