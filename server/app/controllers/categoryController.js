const categoryService = require("../services/categoryService")
const {validationResult, body, param} = require("express-validator");

const validator = (method) => {
    switch (method) {
        case 'create':
            return [
                body('title', 'The category name must not be an empty string').escape().trim().notEmpty(),
                body('title', 'Category name should not exceed 255 characters').escape().trim().isLength({max: 255}),
            ]
        case 'getById':
        case "deleteById":
            return [
                param('categoryId', 'An invalid category ID was specified').escape().trim().isMongoId()
            ]
        case "change":
            return [
                param('categoryId', 'An invalid category ID was specified').escape().trim().isMongoId(),
                body('title', 'The category name must not be an empty string').escape().trim().notEmpty(),
                body('title', 'Category name should not exceed 255 characters').escape().trim().isLength({max: 255}),
            ]
    }
}
const getAllCategories = async (req, res) => {

    try {
        let categories = await categoryService.getAll(req.user._id)
        res.json(categories);
    } catch (error) {
        res.status(error?.status || 500).send({message: error?.message || error});
    }

}

const createCategory = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({
        errors: error.array(),
        message: 'Invalid data for category creation'
    });

    let {title} = req.body;
    let userId = req.user._id;
    try {
        let category = await categoryService.createCategory(userId, title);
        res.status(201).json(category);
    } catch (error) {
        res.status(error?.status || 500).send({message: error?.message || error});
    }

}
const getCategoryById = async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({
        errors: error.array(),
        message: 'Invalid data for category creation'
    });

    let {categoryId} = req.params;
    let userId = req.user._id;
    try {
        let category = await categoryService.getCategoryById(userId, categoryId);
        res.json(category);
    } catch (error) {
        res.status(error?.status || 500).send({message: error?.message || error});
    }
}

const deleteCategory = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({
        errors: error.array(),
        message: 'Invalid data'
    });
    let {categoryId} = req.params;
    let userId = req.user._id;
    try {
        await categoryService.deleteCategory(userId, categoryId);
        res.status(204).json();
    } catch (error) {
        res.status(error?.status || 500).send({message: error?.message || error});
    }
}
const deleteAllCategories = async (req, res) => {
    try {
        let userId = req.user._id;
        await categoryService.deleteAllCategories(userId);
        res.status(204).json();
    } catch (error) {
        res.status(error?.status || 500).send({message: error?.message || error});
    }
}

const changeCategory = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({
        errors: error.array(),
        message: 'Invalid data'
    });
    let {categoryId} = req.params;
    let userId = req.user._id;
    let newTitle = req.body.title
    try {
        let category = await categoryService.changeCategory(userId, categoryId, newTitle);
        res.json(category);
    } catch (error) {
        res.status(error?.status || 500).send({message: error?.message || error});
    }
}


module.exports = {
    validator,
    getAllCategories,
    createCategory,
    getCategoryById,
    deleteCategory,
    deleteAllCategories,
    changeCategory
}