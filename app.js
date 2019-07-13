const fs = require('fs');
const path = require('path');

var key = fs.readFileSync('./encryption/private.key');
var cert = fs.readFileSync( './encryption/primary.cert' );
var options = {
    key: key,
    cert: cert
};

var port = process.env.PORT || 80;


//https://medium.com/@nileshsingh/everything-about-creating-an-https-server-using-node-js-2fc5c48a8d4e
const express = require('express');
const app = express();
const forceSsl = require('express-force-ssl');
app.use(forceSsl);
const serverSSL = require('https').createServer(options,app).listen(443);
const server = require('http').createServer(app).listen(80);

const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public')); 

app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/', express.static(__dirname + '/node_modules/bootstrap/dist')); // redirect bootstrap JS, CSS, and fonts

