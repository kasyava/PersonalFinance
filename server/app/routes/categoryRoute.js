const {Router} = require('express');
const auth = require('../middlewares/authMiddleware')
const categoryController = require('../controllers/categoryController')

const router = Router();

// Get all categories
router.get("/", auth, categoryController.getAllCategories);

//  Create Category
router.post('/', auth, categoryController.validator('create'), categoryController.createCategory);

//Get data for the specified category by categoryId
router.get('/:categoryId', auth, categoryController.validator('getById'), categoryController.getCategoryById);

//Delete the selected category by categoryId
router.delete('/:categoryId', auth, categoryController.validator("deleteById"), categoryController.deleteCategory);

//Change the selected category
router.patch("/:categoryId", auth, categoryController.validator("change"), categoryController.changeCategory);

module.exports = router;