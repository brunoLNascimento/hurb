const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

consign({cwd:'app'})
    .include('model')   
    .then('worker')
    .then('controllers')
    .then('routes')
    .then('config')
    .into(app);

module.exports = app;