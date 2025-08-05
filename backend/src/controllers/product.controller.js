import {productModel} from '../dao/models/product.model.js'
export class ProductController {

    static async createProduct(req, res){
        const { title, description, price,code, stock, category } = req.body
        const thumbnail = req.file.filename
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            if (title.length < 3 || description.length < 10 || category.length < 3) {
                return res.status(400).json({ message: 'Title must be at least 3 characters long, description at least 10 characters long, and category at least 3 characters long' });
            }
            if(await productModel.findOne({ code })) {
                return res.status(400).json({ message: 'Product with this code already exists' });
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
            const product = await productModel.create(newProduct)
            res.status(201).json({ message: 'Product created successfully', product })
        } catch (error) {
            res.status(500).json({ status:'error',message:error.message })
        }
    }
}