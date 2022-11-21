const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        min: 0,
        required: true,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;