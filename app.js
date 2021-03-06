const fs = require('fs');
const path = require('path');

var key = fs.readFileSync('./encryption/private.key');
var cert = fs.readFileSync( './encryption/primary.cert' );
var options = {
    key: key,
    cert: cert
};

var port = process.env.PORT || 8000;
var portSSL = 4430;

//https://medium.com/@nileshsingh/everything-about-creating-an-https-server-using-node-js-2fc5c48a8d4e
const express = require('express');
const app = express();
const forceSSL = require('express-force-ssl');
app.use(forceSSL);
app.set('forceSSLOptions', {
    enable301Redirects: true,
    trustXFPHeader: false,
    httpsPort: portSSL,
    sslRequiredMessage: 'SSL Required.'
});
const serverSSL = require('https').createServer(options,app).listen(portSSL);
const server = require('http').createServer(app).listen(port);

const io = require('socket.io')(serverSSL);

app.use(express.static(__dirname + '/public')); 

app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/', express.static(__dirname + '/node_modules/bootstrap/dist')); // redirect bootstrap JS, CSS, and fonts
app.use('/js', express.static(__dirname + '/node_modules/webrtc-adapter/out')); // redirect webrtc adapter JS