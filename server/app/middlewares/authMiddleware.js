const jwt = require('jsonwebtoken');

const {isValidObjectId} = require('../libs/validators')

const config = require('../../config');
const User = require('../models/userModel');

const auth = (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({message: "Unauthorized"});
    const token = header.split(' ')[1];
    if (!token) return res.status(401).json({message: "Unauthorized"});

    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {

        if (err) return res.status(401).json({message: "Unauthorized"});
        if (!isValidObjectId(decoded.userId)) return res.status(400).json({message: "Bad request"});

        let user = await User.findOne({_id: decoded.userId})
        if (!user || (new Date(user.tokenLastDate).getTime() !== new Date(decoded.iat * 1000).getTime())) return res.status(401).json({message: "Unauthorized"});

        req.user = user;
        next();
    });
};

module.exports = auth;