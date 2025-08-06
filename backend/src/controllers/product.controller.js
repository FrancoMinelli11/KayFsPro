import {productModel} from '../dao/models/product.model.js'
import { ProductDao } from '../dao/product.dao.js'
export class ProductController {
    static async getAllProducts(req, res) {
        try {
            const products = await ProductDao.getAll()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products', error })
        }
    }

    static async getProductById(req, res) {
        const { pid } = req.params
        try {
            const product = await ProductDao.getBy({ _id: pid })
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product', error })
        }
    }

    static async createProduct(req, res){
        const { title, description, price,code, stock, category } = req.body
        const thumbnail = req.file.filename
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
                return res.status(400).json({ message: 'All fields are required' })
            }
            if (title.length < 3 || description.length < 10 || category.length < 3) {
                return res.status(400).json({ message: 'Title must be at least 3 characters long, description at least 10 characters long, and category at least 3 characters long' })
            }
            if(await productModel.findOne({ code })) {
                return res.status(400).json({ message: 'Product with this code already exists' })
            }
            const newProduct = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                category
            }
            const product = await ProductDao.post(newProduct)
            res.status(201).json({ message: 'Product created successfully', product })
        } catch (error) {
            res.status(500).json({ status:'error',message:error.message })
        }
    }

    static async updateProduct(req, res) {
        const { pid } = req.params
        const updateData = req.body
        if (req.file) {
            updateData.thumbnail = req.file.filename
        }
        if(updateData.title && updateData.title.length < 3 || updateData.description && updateData.description.length < 10 || updateData.category && updateData.category.length < 3) {
            return res.status(400).json({ message: 'Title must be at least 3 characters long, description at least 10 characters long, and category at least 3 characters long' })
        }
        if (updateData.code && updateData.code.length > 0) {
            const existingProduct = await productModel.findOne({ code: updateData.code, _id: { $ne: pid } })
            if (existingProduct) {
                return res.status(400).json({ message: 'Product with this code already exists' })
            }
        }
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' })
        }
        if(Object.values(updateData).some(value => value === undefined || value === null || value === '' )) {
            return res.status(400).json({ message: 'All fields must be provided' })
        }
        try {
            const updatedProduct = await ProductDao.put(pid, updateData)
            res.status(200).json({ message: 'Product updated successfully', product: updatedProduct })
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error })
        }
    }
    static async deleteProduct(req, res) {
        const { pid } = req.params
        try {
            const deletedProduct = await ProductDao.delete(pid)
            res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct })
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error })
        }
    }
}