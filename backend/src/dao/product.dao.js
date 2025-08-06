import {productModel} from './models/product.model.js'
export class ProductDao {
    static async getAll() {
        const products = await productModel.find().lean()
        return products
    }

    static async getBy(param) {
        const product = await productModel.findOne(param).lean()
        if (!product) {
            throw new Error('Product not found')
        }
        return product
    }

    static async post(productData) {
        const newProduct = await productModel.create(productData)
        return newProduct
    }

    static async put(productId, updateData) {
        const updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, { new: true })
        if (!updatedProduct) {
            throw new Error('Product not found')
        }
        return updatedProduct
    }

    static async delete(productId) {
        const deletedProduct = await productModel.findByIdAndDelete(productId)
        if (!deletedProduct) {
            throw new Error('Product not found')
        }
        return deletedProduct
    }
}