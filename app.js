let express = require('express');
let bodyParser = require('body-parser');
let consign = require('consign');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

consign({cwd:'app'})
    .include('model')    
    .then('controllers')
    .then('routes')
    .then('config')
    .into(app);

module.exports = app;