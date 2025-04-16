import Customer from "../model/customer.js";

export const createcustomer = async (req, res) => {
    try {
        const { customer_Name, email, mobile_Number, address, status } = req.body;
        if(!customer_Name || !email || !mobile_Number || !address || !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Customer.create({customer_Name, email, mobile_Number, address, status})
        res.status(201).json({
            success: true,
            message: 'Customer created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Customer', details: error.message });
    }
};

export const getAllCustomers = async (req, res) => {
    try {
        const customer = await Customer.find();
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer id not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCustomer = async (req, res) => {
    try {
        const { customer_Name, email, mobile_Number, address,  status } = req.body;
        const customerId = req.params.id; 

        const existingCustomer = await Customer.findById(customerId);
        if (!existingCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const updateData = {
            customer_Name, email, mobile_Number, address, status
        };

        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            updateData,
            { new: true } 
        );

        res.json({
            success: true,
            message: 'Customer updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id; 
        const deletedcustomer = await Customer.findByIdAndDelete(customerId); 
        if (!deletedcustomer) {
            return res.status(404).json({ message: 'customer not found' });
        }
        res.json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};