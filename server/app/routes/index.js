const {Router} = require('express');
const authRouter = require('./authRoute');
const categoryRouter = require('./categoryRoute')
const userRouter = require('./userRoute')

const router = Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);


module.exports = router;