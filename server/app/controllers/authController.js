const {check, validationResult} = require("express-validator");
const config = require("../../config");

const authService = require('../services/authService')


const validator = (method) => {
    switch (method) {
        case 'login':
            return [
                check('email', 'Please enter a valid email address').normalizeEmail().isEmail(),
                check('password', 'Enter password').escape().trim().isString().notEmpty()
            ]
        case 'registration':
            return [
                check('email', 'Please enter a valid email address').normalizeEmail().isEmail(),
                check('username', `The minimum username length is ${config.USERNAME_MIN_LENGTH} characters`).trim().isLength({min: config.USERNAME_MIN_LENGTH}),
                check('password', `The minimum password length is ${config.PASSWORD_MIN_LENGTH} characters`).trim().isLength({min: config.PASSWORD_MIN_LENGTH}),
            ]
    }
}

const login = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({
        errors: error.array(),
        message: 'Invalid login details'
    });

    let {email, password} = req.body;
    try {
        let loginData = await authService.userLogin(email, password);
        res.json(loginData)
    } catch (error) {
        res.status(error?.status || 500).send({message: error?.message || error});
    }

};

const registration = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({
        errors: error.array(),
        message: 'Invalid registration data'
    });

    let {email, username, password} = req.body;
    try {
        await authService.userRegistration(email, password, username)
        res.status(201).json({message: 'The user has been created'});
    } catch (error) {
        res.status(error?.status || 500).send({message: error?.message || error});
    }


}
// router.post('/registration',
//     async (req, res) => {
//         try {
//             const error = validationResult(req);
//             if (!error.isEmpty()) return res.status(400).json({
//                 errors: error.array(),
//                 message: 'Invalid registration data'
//             });
//
//             const {email, username, password} = req.body;
//             let candidate = await User.findOne({email});
//             if (candidate) return res.status(400).json({message: 'Such a user already exists'});
//
//             let user = new User({email, username, password});
//             user.save().then(() => {
//                 res.status(201).json({message: 'The user has been created'});
//
//             })
//
//
//         } catch (e) {
//             res.status(500).json({message: 'Something went wrong. Please try again'});
//         }
//     }
// );

module.exports = {
    validator,
    login,
    registration
}