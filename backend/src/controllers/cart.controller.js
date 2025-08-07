import {CartDao} from "../dao/cart.dao.js"
export class CartController {
    static async getCart(req, res) {
        try {
            const cart = await CartDao.get(req.user._id)
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' })
            }
            res.status(200).json(cart)
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving cart', error })
        }
    }

    static async addToCart(req, res) {
        const { productId, quantity } = req.body
        try {
            if (!productId || !quantity) {
                return res.status(400).json({ message: 'Product ID and quantity are required' })
            }
            const cart = await CartDao.put(req.user._id, productId, quantity)
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' })
            }
            res.status(200).json(cart)
        } catch (error) {
            res.status(500).json({ message: 'Error adding to cart', error })
        }
    }

    static async deleteProduct(req, res) {
        const { productId } = req.params
        try {
            const cart = await CartDao.deleteProduct(req.user._id, productId)
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' })
            }
            res.status(200).json(cart)
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product from cart', error })
        }
    }

    static async clearCart(req, res) {
        try {
            const cart = await CartDao.clearCart(req.user._id)
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' })
            }
            res.status(200).json(cart)
        } catch (error) {
            res.status(500).json({ message: 'Error clearing cart', error })
        }
    }
}