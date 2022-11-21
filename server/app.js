const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const config = require('./config');
const memcached = require('./libs/memcached/memcached');


const auth = require('./routes/Auth.route');
const category = require('./routes/Category.route');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/auth', auth);
app.use('/api/category', category);


const dbConnect = () => {
    console.log(`Database connection established!`);

    app.listen(config.PORT, () => {
        console.log(`Server started on ${config.PORT} port!`)
    });
    memcached.connect();
}

mongoose.connect(config.DB.URL + '/' + config.DB.NAME, {}, dbConnect);