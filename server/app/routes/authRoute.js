const {Router} = require('express');

const authController = require('../controllers/authController')

const router = Router();

router.post("/login", authController.validator('login'), authController.login);
router.post("/registration", authController.validator('registration'), authController.registration);


module.exports = router;