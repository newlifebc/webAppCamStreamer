const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const serverSSL = require('https').createServer(app).listen(443);
const server = require('http').createServer(app).listen(80);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public')); 

app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/', express.static(__dirname + '/node_modules/bootstrap/dist')); // redirect bootstrap JS, CSS, and fonts

var port = process.env.PORT || 80;
server.listen(port);