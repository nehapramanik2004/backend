import User from "../model/user.js";
import bcrypt from"bcrypt";
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    try {
        const { user_Name,password } = req.body;
        if(!user_Name || !password ) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        const existingUser = await User.findOne({user_Name})
        if(existingUser) {
            return res.status(400).json({success: false, message: "User already exists"})
        }
         const hashedpassword = await bcrypt.hash(password ,10)

        await User.create({user_Name: user_Name,password: hashedpassword})
        res.status(201).json({
            success:true,
            message: 'user created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the user', details: error.message });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'user id not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const {user_Name, password } = req.body;
        const userId = req.params.id; 

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'user not found' });
        }

        const updateData = {
            user_Name, password
        };

        const updateduser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true } 
        );

        res.json({
            success: true,
            message: 'user updated successfully',
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; 
        const deletedUser = await User.findByIdAndDelete(userId); 
        if (!deletedUser) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.json({success:true, message: 'user deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const login = async (req, res) => {
    const { user_Name, password } = req.body;
    try {
        const user = await User.findOne({ user_Name });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        	}

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { _id: user._id, user_Name: user.user_Name},
            process.env.SECRET_KEY,
            { expiresIn: '1y' }
        );
  
        return res.json({
            success: true,
            message:'Login successful!',
            token: token,
            userId: user._id,
        });
  
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Login failed', error: error.message });
    }
}

