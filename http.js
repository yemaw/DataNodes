
/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');

var express = require('express');
var app = express();

var swig = require('swig');
var flash = require('connect-flash');

app.configure(function() {

    app.use(express.cookieParser('keyboard cat')); // ???
    app.use(express.session({ cookie: { maxAge: 60000 }})); //???
    app.use(flash());

    app.set('base_dir', __dirname);
    app.set('views', __dirname + '/');
    app.use('/assets', express.static(path.join(__dirname, 'assets')));

    app.set('port', process.env.PORT || 3000);

    app.set('view engine', 'html');
    app.engine('html', swig.renderFile);

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);


    app.use(express.logger('dev'));
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/* ----------- Attaching App ---------------*/
var router = require('./router.js');
var yangonbuses_admin_configs = {
    view_controllers_dir : 'views',
    data_controllers_dir : 'controllers',
    pass_controllers_to_views : true,
    response_type : 'html',
    html_dir : 'views/html'
}

var yangonbuses_admin_info = router.initialize('yangonbuses_admin', './yangonbuses', yangonbuses_admin_configs);
app.all('/yangonbuses/admin/*',function(req, res){
    router.route('yangonbuses_admin', req, res, 2, yangonbuses_admin_info);
});

var yangonbuses_api_v1_configs = {
    view_controllers_dir : 'api/v1',
    data_controllers_dir : 'controllers',
    pass_controllers_to_views : true,
    response_type : 'json'
}

var yangonbuses_api_v1_info = router.initialize('yangonbuses_api_v1', './yangonbuses', yangonbuses_api_v1_configs);
app.all('/api/yangonbuses/v1/*',function(req, res){
    router.route('yangonbuses_api_v1', req, res, 3, yangonbuses_api_v1_info);
});

/*
var framework = require('./framework.js');
var yangonbuses_admin_configs = {
    view_controllers_dir : 'views',
    data_controllers_dir : 'controllers',
    pass_controllers_to_views : true,
    response_type : 'html',
    html_dir : 'html'
}

var yangonbuses_admin_info = framework.initialize('yangonbuses_admin', './yangonbuses', yangonbuses_admin_configs);
app.all('/yangonbuses/admin/*',function(req, res){
    framework.route('yangonbuses_admin', req, res, 2, yangonbuses_admin_info);
});
*/

/*
var yangonbuses2_admin_configs = {
    view_controllers_dir : 'views',
    data_controllers_dir : 'controllers',
    pass_controllers_to_views : true,
    response_type : 'html',
    html_dir : 'ui'
}

var yangonbuses2_admin_info = framework.initialize('yangonbuses2_admin', './yangonbuses2', yangonbuses2_admin_configs);
app.all('/yangonbuses2/admin/*',function(req, res){
    framework.route('yangonbuses2_admin', req, res, 2, yangonbuses2_admin_info);
});
*/
/*
var yangonbuses_api_configs = {
    view_controllers_dir : 'api',
    data_controllers_dir : 'controllers',
    pass_controllers_to_views : true
}

var yangonbuses_api_info = framework.initialize('yangonbuses_api', './yangonbuses', yangonbuses_api_configs);
app.all('/api/yangonbuses/*',function(req, res){
    framework.route('yangonbuses_api', req, res, 2, yangonbuses_api_info);
});
*/

/*
var yangonbuses2 = require('./framework.js');
yangonbuses2.initialize('./framework', yangonbuses_admin_configs);
app.all('/yangonbuses2/*',function(req, res){
    yangonbuses2.route(req, res, 1, 'html');

});
*/

app.get('*',function(req, res){
    res.render('./pages/404.html');
});
//Starting HTTP Server
app.listen(app.get('port'));