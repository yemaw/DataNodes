
/**
 * Module dependencies.
 */
GLOBAL.zit = require('./globals');

var http = require('http');
var path = require('path');
var fs = require('fs');
var swig = require('swig');

var express = require('express');
var app = express();

var mongodb = require('mongodb');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('base_dir', __dirname);

app.set('views', __dirname + '/');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
var router = require('./router');
router.initialize('./yangonbuses/');
app.all('/yangonbuses/*',function(req, res){
    router.route(req, res, 1);
});
*/

var transport = require('./router');
transport.initialize('./transport/');
app.all('/transport/*',function(req, res){
    transport.route(req, res, 1);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('NodeJS server start listening on port ' + app.get('port'));
});
