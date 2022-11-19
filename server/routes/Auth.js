const express = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const config = require('../config')

const router = express.Router();

router.post('/login',
    [
        check('email', 'Please enter a valid email address').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists().isString().notEmpty()
    ],
    async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({
                    errors: error.array(),
                    message: 'Invalid login details'
                })
            }
            let {email, password} = req.body;

            let user = await User.findOne({email});

            if (!user) return res.status(400).json({message: 'User is not found'});

            let isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) return res.status(400).json({message: 'Wrong password, please try again'});


            let dtLastLogin = Math.floor(Date.now() / 1000);
            user.tokenLastDate = (dtLastLogin * 1000);


            let dataAccessToken = {
                iat: dtLastLogin,
                userId: user._id,
            };
            let jwtAccessToken = jwt.sign(dataAccessToken, config.JWT_SECRET, {
                algorithm: 'HS256',
                expiresIn: (60 * 5)
            });

            let dataRefreshToken = {
                userId: user._id,
            };
            let jwtRefreshToken = jwt.sign(dataRefreshToken, config.JWT_SECRET, {algorithm: 'HS256', expiresIn: '2d'});
            user.refreshToken = jwtRefreshToken;
            user.save().then(() => {
                res.json({token: jwtAccessToken, refreshToken: jwtRefreshToken});
            })

        } catch (e) {
            res.status(500).json({message: 'Something went wrong. Please try again'});
        }
    }
);


module.exports = router;