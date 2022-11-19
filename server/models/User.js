const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');
// const nanoid = require('nanoid');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {type: String},
    password: {
        type: String,
        require: true
    },
    tokenLastDate: Date,
    refreshToken: String,
}, {timestamps: true});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bCrypt.genSaltSync(10);
    this.password = await bCrypt.hashSync(this.password, salt);

    next();
});


UserSchema.index({email: 1});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;