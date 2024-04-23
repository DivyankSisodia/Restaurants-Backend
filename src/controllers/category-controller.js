const Category = require('../models/category.model');
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

const getAllCategoryController = async (req, res) => {
    try {
        const allCategories = await Category.find({});

        if(!allCategories) {
            return res.status(404).json({
                success: false,
                message: "No Category Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "All Categories",
            totalCategories: allCategories.length,
            data: allCategories
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed/Error in Getting All Categories",  
            error: error.message
        })
    }
}

const updateCategoryController = async(req, res) => {
    try {
        const { id } = req.params;
        const {title, image} = req.body;

        console.log('id', id);

        const updateCat = await Category.findByIdAndUpdate(id, {title, image}, {new: true});

        if(!updateCat){
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            data: updateCat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed/Error in Updating Category",
            error: error.message
        })
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({
                success: false,
                message: "Category ID is required"
            });
        }

        const category = await Category.findById(id);

        if(!category){
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        const deleteCat = await Category.findByIdAndDelete(id);

        if(!deleteCat){
            return res.status(500).json({
                success: false,
                message: "Error in deleting category"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully",
            data: deleteCat
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed/Error in Deleting Category",
            error: error.message
        })
    }
}

module.exports = { 
    createCategoryController, 
    getAllCategoryController,
    updateCategoryController,
    deleteCategoryController
};