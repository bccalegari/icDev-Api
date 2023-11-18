require('dotenv').config();
const routes = require('./routes');
const express = require('express');

const app = express();

routes(app);

module.exports = app;
