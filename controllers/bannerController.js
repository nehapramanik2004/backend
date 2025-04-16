import Banner from "../model/banner.js";

export const createbanner = async (req, res) => {
    try {
        const { banner_Name, description, img, valid_From, valid_To, status } = req.body;
        if(!banner_Name || ! description || ! img || !valid_From || !valid_To || !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Banner.create({banner_Name, description, img, valid_From, valid_To , status})
        res.status(201).json({
            success: true,
            message: 'Banner created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Banner', details: error.message });
    }
};

export const getAllbanners = async (req, res) => {
    try {
        const banner = await Banner.find();
        res.json(banner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getbannerById = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const banner = await Banner.findById(bannerId);
        if (!banner) {
            return res.status(404).json({ message: 'Banner id not found' });
        }
        res.json(banner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updatebanner = async (req, res) => {
    try {
        const { banner_Name, description, img, valid_From, valid_To ,status } = req.body;
        const bannerId = req.params.id; 

        const existingbanner = await Banner.findById(bannerId);
        if (!existingbanner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        const updateData = {
            banner_Name, description, img, valid_From, valid_To, status
        };

        const updatedbanner = await Banner.findByIdAndUpdate(
            bannerId,
            updateData,
            { new: true } 
        );

        res.json({
            success: true,
            message: 'Banner updated successfully',
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteBanner = async (req, res) => {
    try {
        const bannerId = req.params.id; 
        const deletedBanner = await Banner.findByIdAndDelete(bannerId); 
        if (!deletedBanner) {
            return res.status(404).json({ message: 'Banner not found' });
        }
        res.json({success: true, message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};