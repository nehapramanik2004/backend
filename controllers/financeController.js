import Finance from "../model/finance.js";

export const createfinance = async (req, res) => {
    try {
        const { finance_Name, amount, transaction, category, payment_Mode, status} = req.body;
        if(!finance_Name || !amount || !transaction || !category || !payment_Mode|| !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Finance.create({finance_Name, amount, transaction, category, payment_Mode, status})
        res.status(201).json({
            success: true,
            message: 'Finance created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Finance', details: error.message });
    }
};

export const getAllfinances = async (req, res) => {
    try {
        const finance = await Finance.find();
        res.json(finance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getfinanceById = async (req, res) => {
    try {
        const financeId = req.params.id;
        const finance = await Finance.findById(financeId);
        if (!finance) {
            return res.status(404).json({ message: 'Finance id not found' });
        }
        res.json(finance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updatefinance = async (req, res) => {
    try {
        const { finance_Name, amount, transaction, category, payment_Mode, status } = req.body;
        const financeId = req.params.id; 

        const existingfinance = await Finance.findById(financeId);
        if (!existingfinance) {
            return res.status(404).json({ message: 'finance not found' });
        }

        const updateData = {
        finance_Name, amount, transaction, category, payment_Mode, status
        };

        const updatedfinance = await Finance.findByIdAndUpdate(
            financeId,
            updateData,
            { new: true } 
        );

        res.json({
            success: true,
            message: 'finance updated successfully',
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteFinance = async (req, res) => {
    try {
        const financeId = req.params.id; 
        const deletedFinance = await Finance.findByIdAndDelete(financeId); 
        if (!deletedFinance) {
            return res.status(404).json({ message: 'finance not found' });
        }
        res.json({success: true, message: 'finance deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};