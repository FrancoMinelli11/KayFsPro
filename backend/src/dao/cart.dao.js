import { cartModel } from "./models/cart.model.js"

export class CartDao {

    static async get(userId) {
        try {
            const cart = await cartModel.findOne({ user: userId })
            if (!cart) {
                throw new Error('Cart not found')
            }
            return cart
        } catch (error) {
            throw new Error('Error retrieving cart')
        }
    }

    static async put(userId, productId, quantity) {
        const cart = await cartModel.findOne({ user: userId })
        if (!cart) {
            throw new Error('Cart not found')
        }
            const productIndex = cart.products.findIndex(p => p.product._id.toString() === productId.toString())
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity
            } else {
                cart.products.push({ product: productId, quantity })
            }
            await cart.save()
        return cart
    }

    static async deleteProduct(userId, productId) {
        try {
            const cart = await cartModel.findOne({ user: userId })
            if (!cart) {
                throw new Error('Cart not found')
            }
            const productIndex = cart.products.findIndex(p => p.product._id.toString() === productId.toString())
            if (productIndex > -1) {
                cart.products.splice(productIndex, 1)
                await cart.save()
            }
            return cart
        } catch (error) {
            throw new Error('Error deleting product from cart')
        }
    }

    static async clearCart(userId) {
        try {
            const cart = await cartModel.findOneAndUpdate(
                { user: userId },
                { products: [] },
                { new: true }
            )
            if (!cart) {
                throw new Error('Cart not found')
            }
            return cart
        } catch (error) {
            throw new Error('Error clearing cart')
        }
    }
}