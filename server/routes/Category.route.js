const {Router} = require('express');
const auth = require('../middlewares/auth.middleware')
const {check, validationResult} = require("express-validator");

const Category = require('../models/Category.model')
const {isValidObjectId} = require("../libs/validators");

const router = Router();

//  Create Category
router.post('/', auth,
    check('title', 'Enter a category name').exists().isString().notEmpty(),
    async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) return res.status(400).json({
                errors: error.array(),
                message: 'Invalid data for category creation'
            });

            let {title} = req.body;
            let category = await Category.findOneAndUpdate(
                {title, user: req.user._id},
                {title, user: req.user._id},
                {upsert: true, new: true}
            ).lean();

            res.status(201).json(category);

        } catch (e) {
            res.status(500).json({message: 'Something went wrong. Please try again'});
        }

    }
);

// Get all categories
router.get("/", auth, async (req, res) => {
    try {
        let categories = Category.find({user: req.user._id}).lean();
        res.json(categories);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong. Please try again'});
    }
});

//Get data for the specified category by categoryId
router.get('/:categoryId', auth,
    check('categoryId', 'Please provide a valid categoryId').exists().isString().isLength({min: 24}),
    async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) return res.status(400).json({
                errors: error.array(),
                message: 'Invalid data for the category'
            });

            let {categoryId} = req.params;
            if (!isValidObjectId(categoryId)) return res.status(400).json({message: "Bad request"});

            let category = await Category.findOne({_id: categoryId, user: req.user._id}).lean();
            res.json(category);

        } catch (e) {
            res.status(500).json({message: 'Something went wrong. Please try again'});
        }

    }
);

//Delete the selected category by categoryId
router.delete('/:categoryId', auth,
    check('categoryId', 'Please provide a valid categoryId').exists().isString().isLength({min: 24}),
    async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) return res.status(400).json({
                errors: error.array(),
                message: 'Invalid data for deleting a category'
            });

            let {categoryId} = req.params;
            if (!isValidObjectId(categoryId)) return res.status(400).json({message: "Bad request"});

            let category = await Category.findOneAndDelete({_id: categoryId, user: req.user._id});
            res.status(201).json(category)

        } catch (e) {
            res.status(500).json({message: 'Something went wrong. Please try again'});
        }

    }
);

//Change the selected category
router.put('/', auth,
    check('categoryId', 'Please provide a valid categoryId').exists().isString().isLength({min: 24}),
    check('title', 'Please provide a valid newTitle').exists().isString().notEmpty(),
    async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) return res.status(400).json({
                errors: error.array(),
                message: 'Invalid data for category change'
            });
        } catch (e) {
            res.status(500).json({message: 'Something went wrong. Please try again'});
        }
    }
);

module.exports = router;