const mongoose = require('mongoose');

const config = require('./config');

const User = require('./models/User');

mongoose.connect(config.DB.URL + '/' + config.DB.NAME);


const db = mongoose.connection;

db.once('open', async () => {

    try {
        await db.dropCollection('users');
    } catch (e) {
        console.log(e.message)
        console.log('Collections USERS where not present, skipping drop...');
    }
    console.log('USERS is dropped');

    await User.create({
        username: '123456789',
        password: '123456789',
        email: '123456789@gmail.com'
    });
    console.log('USERS created');

    console.log('All collections were created');
    db.close();


});
