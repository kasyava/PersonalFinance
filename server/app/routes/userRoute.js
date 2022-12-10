const {Router} = require('express');
const router = Router();

const auth = require('../middlewares/authMiddleware')

router.get('/', auth, (req, res) => {
    res.json({user: req.user})
})

module.exports = router;