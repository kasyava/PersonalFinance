const ObjectId = require('mongoose').Types.ObjectId;

// MongoDB ObjectId validator
exports.isValidObjectId = (id) => {
    if (ObjectId.isValid(id)) {
        return (String)(new ObjectId(id)) === id;
    }
    return false;
}
