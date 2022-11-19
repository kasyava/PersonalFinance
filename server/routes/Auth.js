const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();

router.post('/login',
    [
        check('email', 'Введите коректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists({checkFalsy: true})
    ],
    (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({
                    errors: error.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }


        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
        }
    })


module.exports = router;