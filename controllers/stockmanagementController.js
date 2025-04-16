import StockManagement from "../model/stockmanagement.js";

export const createStockManagement = async (req, res) => {
    try {
        const { product_id, quantities, restock_date, reorder_level } = req.body;
        if(!product_id || !quantities|| !restock_date || !reorder_level ) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await StockManagement.create({product_id, quantities , restock_date, reorder_level})
        res.status(201).json({
            success: true,
            message: 'StockManagement created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the StockManagement', details: error.message });
    }
};

export const getAllStockManagements = async (req, res) => {
    try {
        const stockmanagement = await StockManagement.find();
        res.json(stockmanagement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getStockManagementById = async (req, res) => {
    try {
        const stockmanagementId = req.params.id;
        const stockmanagement = await StockManagement.findById(stockmanagementId);
        if (!stockmanagement) {
            return res.status(404).json({ message: 'StockManagement id not found' });
        }
        res.json(stockmanagement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateStockManagement = async (req, res) => {
    try {
        const { product_id, quantities, restock_date, reorder_level } = req.body;
        const stockmanagementId = req.params.id; 

        const existingStockManagement = await StockManagement.findById(stockmanagementId);
        if (!existingStockManagement) {
            return res.status(404).json({ message: 'StockManagement not found' });
        }

        const updateData = {
            product_id, quantities, restock_date, reorder_level
        };

        const updatedStockManagement = await StockManagement.findByIdAndUpdate(
            customerId,
            updateData,
            { new: true } 
        );

        res.json({
            success: true,
            message: 'StockManagement updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteStockManagement = async (req, res) => {
    try {
        const stockmanagementId = req.params.id; 
        const deletedstockmanagement = await StockManagement.findByIdAndDelete(stockmanagementId); 
        if (!deletedstockmanagement) {
            return res.status(404).json({ message: 'stockmanagement not found' });
        }
        res.json({ success: true, message: 'StockManagement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};