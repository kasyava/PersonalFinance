const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        trim: true,
        maxLength: 256,
        required: [true, 'Please enter a category name'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;