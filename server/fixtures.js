const mongoose = require('mongoose');

const config = require('./config');

const User = require('./app/models/userModel');
const Category = require('./app/models/categoryModel');

mongoose.connect(config.DB.URL + '/' + config.DB.NAME);


const db = mongoose.connection;

db.once('open', async () => {

    try {
        await db.dropCollection('users');
        console.log('USERS is dropped');
    } catch (e) {

        console.log('Collections USERS where not present, skipping drop...');
    }


    try {
        await db.dropCollection('categories');
        console.log('CATEGORIES is dropped');
    } catch (e) {

        console.log('Collections CATEGORIES where not present, skipping drop...');
    }


    const user = await User.create({
        username: '123456789',
        password: '123456789',
        email: '123456789@gmail.com'
    });
    console.log('USERS created');

    await Category.create({
        title: 'Bred',
        user: user._id,
    }, {
        title: "Bear",
        user: user._id
    });
    console.log('CATEGORIES created');


    console.log('All collections were created');
    db.close();


});
