const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const config = require('../config');
// const memcached = require('./libs/memcached/memcached');

const v1Routers = require('./routes')

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/v1', v1Routers);

const dbConnect = () => {
    console.log(`Database connection established!`);
    // memcached.connect();
}

mongoose.connect(config.DB.URL + '/' + config.DB.NAME, {}, dbConnect);


module.exports = app;