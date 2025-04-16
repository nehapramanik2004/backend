import Product from "../model/product.js";

export const createProduct = async (req, res) => {
    try {
        const { product_Name, sku, product_Description, category, cost_Price, selling_Price, quantity, status } = req.body;
        if(!product_Name || !sku || !product_Description || !category || !cost_Price || !selling_Price || !quantity || !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Product.create({product_Name, sku, product_Description, category, cost_Price, selling_Price, quantity, status})
        res.status(201).json({
            success:true,
            message: 'product created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the product', details: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getProductById = async (req, res) => {
    try {
        const ProductId = req.params.id;
        const Product = await Product.findById(ProductId);
        if (!Product) {
            return res.status(404).json({ message: 'Product id not found' });
        }
        res.json(Product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { Product_Name, sku, Product_Description, category, cost_Price, selling_Price, quantity, status } = req.body;
        const ProductId = req.params.id; 

        const existingproduct = await Product.findById(ProductId);
        if (!existingproduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updateData = {
            Product_Name, sku, Product_Description, category, cost_Price, selling_Price, quantity, status      };

        const updatedProduct = await Product.findByIdAndUpdate(
            ProductId,
            updateData,
            { new: true } 
        );

        res.json({
            success: true,
            message:'Product updated successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const ProductId = req.params.id; 
        const deletedProduct = await Product.findByIdAndDelete(ProductId); 
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({
            success: true,
             message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};