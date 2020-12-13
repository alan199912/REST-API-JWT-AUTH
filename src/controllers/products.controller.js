import Product from '../models/Products'

export const getProducts = async (req, res, next) => {

    try {
        const products = await Product.find()

        res.json({
            status: 200,
            message: 'List of Products Successfully',
            body: products
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: 500,
            message: 'List of Products Unsuccessfully',
            body: 'Error when listing the products'
        })
    }
    
    
}

export const getProductById = async (req, res, next) => {
    
    try {
        const product = await Product.findById(req.params.id)
        
        res.json({
            status: 200,
            message: 'List Product Successfully',
            body: product
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: 500,
            message: 'List Product Unsuccessfully',
            body: 'Error when listing the product'
        })
    }
}

export const createProduct = async (req, res, next) => {
    
    try {
        const newProduct = new Product(req.body)
    
        const productSave = await newProduct.save()
    
        res.status(201)
        res.json({
            status: 201,
            message: 'Product Created Successfully',
            body: productSave
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: 500,
            message: 'Product Created Unsuccessfully',
            body: 'Error when created the product'
        })
    }
}

export const updateProduct = async (req, res, next) => {

    try {
        
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200)
        res.json({
            status: 204,
            message: 'Product Updated Successfully',
            body: updatedProduct
        })

    } catch (error) {
        res.status(500)
        res.json({
            status: 500,
            message: 'Product Updated Unsuccessfully',
            body: 'Error when Updated Product'
        })
    }
}

export const deleteProduct = async (req, res, next) => {

    try {
        await Product.findByIdAndDelete(req.params.id)
    
        res.status(200)
        res.json({
            status: 204,
            message: 'Product Deleted Successfully'
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: 500,
            message: 'Product Deleted Unsuccessfully',
            body: 'Error when deleted product'
        })
    }

}