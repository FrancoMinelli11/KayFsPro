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
            const cart = await CartDao.put(req.user._id)
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' })
            }
            const productIndex = cart.products.findIndex(p => p.product._id.toString() === productId.toString())
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity
            } else {
                cart.products.push({ product: productId, quantity })
            }
            await cart.save()
            res.status(200).json(cart)
        } catch (error) {
            res.status(500).json({ message: 'Error adding to cart', error })
        }
    }
}