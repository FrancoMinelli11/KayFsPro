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

    static async put(userId) {
        const cart = await cartModel.findOne({ user: userId })
        if (!cart) {
            throw new Error('Cart not found')
        }
        return cart
    }
    
    static async delete(userId) {
        try {
            const cart = await cartModel.findOneAndDelete({ user: userId })
            if (!cart) {
                throw new Error('Cart not found')
            }
            return cart
        } catch (error) {
            throw new Error('Error deleting cart')
        }
    }
}