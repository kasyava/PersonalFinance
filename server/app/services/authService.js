const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../../config");
const userLogin = async (email, password) => {
    try {
        let user = await User.findOne({email});

        if (!user) throw {status: 400, message: `User is not found`};

        let isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) throw {status: 400, message: `Wrong password, please try again`};

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
        await user.save();

        return {token: jwtAccessToken, refreshToken: jwtRefreshToken}

    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error};
    }
}

const userRegistration = async (email, password, username) => {
    try {
        let candidate = await User.findOne({email});
        if (candidate) throw {status: 400, message: `The user already exists.`};

        let user = new User({email, username, password});
        //todo сделать подтверждение регистрации
        return await user.save();

    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error};
    }
}

module.exports = {
    userLogin,
    userRegistration
}