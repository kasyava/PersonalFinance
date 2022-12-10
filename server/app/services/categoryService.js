const Category = require("../models/categoryModel");
const getAll = async (userId) => {
    try {
        return await Category.find({user: userId}).select("-user -__v").lean();
        // if (!categories.length) throw {status: 404, message: `There are no categories`};
        // return categories;
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error};
    }
}


const createCategory = async (userId, title) => {
    try {
        let category = new Category({title, user: userId});
        await category.save();
        return category;
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error};
    }
}
const getCategoryById = async (userId, categoryId) => {
    try {
        let category = await Category.findOne({_id: categoryId, user: userId}).select('-user -__v').lean();
        if (!category) throw {status: 404, message: `Category not found`};
        return category;

    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error};
    }
}

const deleteCategory = async (userId, categoryId) => {
    try {
        let result = await Category.deleteOne({user: userId, _id: categoryId}).lean();
        if (!result.deletedCount) throw {status: 404, message: `Category not found`};
        return result;
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error};
    }
}

const deleteAllCategories = async (userId) => {
    try {
        return await Category.deleteMany({user: userId}).lean();
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error};
    }
}

const changeCategory = async (userId, categoryId, title) => {
    try {
        let result = await Category.findOneAndUpdate({user: userId, _id: categoryId}, {title}, {
            new: true,
            lean: true
        }).select('-user -__v');
        if (!result) throw {status: 404, message: `Category not found`};
        return result;
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error};
    }
}

module.exports = {
    getAll,
    createCategory,
    getCategoryById,
    deleteCategory,
    deleteAllCategories,
    changeCategory
}