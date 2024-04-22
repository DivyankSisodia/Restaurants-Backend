const Category = require('../models/category');
const {color} = require('colors');
const uploadOnCloudinary = require('../utils/cloudinary');

const createCategoryController = async (req, res) => {
    try {
        const { title } = req.body;
        console.log('title', title);

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        // Check if req.file exists before accessing its properties
        let categoryImage;
        if (req.file) {
            const categoryImageLocalPath = req.file.path;
            categoryImage = await uploadOnCloudinary(categoryImageLocalPath);

            if (!categoryImage) {
                return res.status(500).json({
                    success: false,
                    message: "Error in uploading category image"
                });
            }
        }

        const category = new Category({
            title,
            image: categoryImage ? categoryImage.secure_url : undefined
        });

        const result = await category.save();

        if (!result) {
            return res.status(500).json({
                success: false,
                message: "Error in saving category"
            });
        }

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: result
        });

    } catch (error) {
        console.log("error".bgRed, error);
        res.status(500).json({
            success: false,
            message: "Failed/Error in Creating Category",
            error: error.message
        });
    }
};


module.exports = createCategoryController;