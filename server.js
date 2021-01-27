const port = 3000
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const consign = require('consign')
const config = require('./app/config/config')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

consign().include('app/model').then('app/worker').then('app/controllers').then('app/routes').then('app/config').into(server);
server.listen(port, function(){
    console.log(`Servidor rodando na porta: ${port}.`)
})

const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('connecting', function() {
    console.log('MongoDB: Conectando...');
});

db.on('error', function(error) {
    console.log('Error na conexão MongoDB: ' + error);
    mongoose.disconnect();
});
db.on('connected', function() {
    console.log('MongoDB: conectado!');
});
db.once('open', function() {
    console.log('MongoDB: conexão aberta!');
});
db.on('reconnected', function () {
    console.log('MongoDB: reconectado!');
});
db.on('disconnected', function() {
    console.log('MongoDB desconectado!');
});

mongoose.connect(config.db.url,  { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = server