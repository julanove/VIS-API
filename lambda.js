const serverless = require('serverless-http');

var app = require('./server.js');

module.exports.handler = serverless(app);
