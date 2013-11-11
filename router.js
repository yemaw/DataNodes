/**
 * Created by YeMaw on 110//13.
 * version 0.1
 */

exports.initialize = initialize;
exports.route = route;

//-----------------------------------------------------------------------------

var fs  = require('fs');
var url = require('url');

var view_controllers = [];
var data_controllers = [];

function initialize(app_name, app_dir, configs){

    var view_controllers_dir = configs.view_controllers_dir || 'views';
    var data_controllers_dir = configs.data_controllers_dir || 'controllers';
    var pass_controllers_to_views = (configs.pass_controllers_to_views === false) ? false :true;

    var app_info = {};
    app_info.app_name = app_name;
    app_info.app_dir  = app_dir;
    app_info.html_dir = configs.html_dir || 'html';
    app_info.response_type = configs.response_type;
    app_info.pass_controllers_to_views = pass_controllers_to_views;

    view_controllers[app_name] = {};

    var view_controllers_path = app_dir+'/'+view_controllers_dir+'/';
    fs.readdir(view_controllers_path, function(err, files){
        if(err) return;
        files.forEach(function(file){

            fs.stat(view_controllers_path+file, function(err, stats){
                if(err) return;
                if(stats.isFile()){
                    var full_file_name = file.toString();
                    if(!isJSExt(full_file_name)){
                        return;
                    }
                    var file_name = full_file_name.substring(0, file.toString().length-3); //removing '.js'
                    var vc = require(view_controllers_path+file);
                    view_controllers[app_name][file_name] = vc;
                }
            });
        });
    });

    if(pass_controllers_to_views){
        compile_controllers(app_name, app_dir+'/'+data_controllers_dir);
    }

    return app_info;
}

function compile_controllers(app_name, path_to_data_controllers){

    data_controllers[app_name] = {};
    fs.readdir(path_to_data_controllers, function(err, files){

        if(err) return;
        files.forEach(function(file){
            fs.stat(path_to_data_controllers+'/'+file, function(err, stats){

                if(err) return;
                if(stats.isFile()){
                    var full_file_name = file.toString();
                    if(!isJSExt(full_file_name)){//must end with .js
                        return;
                    }
                    var file_name = full_file_name.substring(0, file.toString().length-3); //removing '.js'
                    data_controllers[app_name][file_name] = require(path_to_data_controllers+'/'+file);
                }
            });
        });
    });
}

function route(app_name, req, res, subapp_segment_index, app_info){

    subapp_segment_index = subapp_segment_index || 0;

    //This variable will pass to view service methods
    var meta = [];

    /*
     Example URL : http://api.data.com:3000/myapp/do_something/12345?cat=3&dog=4#hash
     Assume current router is routed to http://api.data.com:3000/myapp/
     */

    //
    var _uris = url.parse(req.url,true, true);

    //Data type(file extension) to return => html, json... Can configure on method call. Default is json
    meta.response_type = app_info.response_type || 'json';

    //All segments(start after hostname) in an array => segments[0] = myapp, segments[1] = do_something ...
    var all_segments = _uris.pathname.substring(1).split('/');

    var _sub_segments = [];
    for(var i=0; i<all_segments.length-subapp_segment_index; i++){
        _sub_segments[i] = all_segments[i+subapp_segment_index]; //#TODO:there is one more blank segment: needt to filter
    }

    //Full URL of the current request => http://api.data.com:3000/myapp/do_something/12345?cat=3&dog=4#hash
    meta.full_url = req.protocol + "://" + req.get('host') + req.url;

    //Protocol => http or https
    meta.protocol = req.protocol;

    //Hostname => api.data.com:3000
    meta.host = req.get('host');

    //URL to sub application => http://api.data.com/myapp/
    meta.url_to_app = '/';
    for(var i=0; i<subapp_segment_index; i++){
        meta.url_to_app += all_segments[i]+'/';
    }

    //All sub segments(start after the url to sub application) in an array => segments[0] = do_something
    meta.segments = _sub_segments;

    //First segment after path to url => do
    meta.first_uri  = _sub_segments[0]+'/';

    //Second segment after path to url => do
    meta.id = _sub_segments[1];

    //All quires after question mark => queries.cat=3 , queries.dog=4
    meta.queries = _uris.query;

    //File system path to current application that is used in initialization => /Users/Me/NodeJS/myapp
    meta.app_dir = app_info.app_dir; //#TODO:

    //TODO: middleware pattern
    meta.flashes = req.flash("flashes");

    //The full request and response
    meta.request = req;
    meta.response = res;

    //default interface folder name is 'html'
    meta.html_file = meta.app_dir+'/'+app_info.html_dir+'/'+meta.segments[0]+'.html';

    meta.do_response = function(meta, status, data){
        handle_response(meta, status, data);
    }

    //Flash message
    meta._flashes = [];
    meta.add_flash = function(type, message){
        meta._flashes.push({type:type, message:message});
        meta.request.flash("flashes", meta._flashes);
    }

    /* Calling Service Method from View Controllers */
    var vc = view_controllers[app_name][_sub_segments[0]];

    if(!vc){
        meta.response.render('./pages/404.html');
        return;
    }
    switch (req.method){
        case 'GET' :
        default:
            vc.onGet(meta, req, res, data_controllers[app_name]);
            break;
        case 'POST' :
            vc.onPost(meta, req, res, data_controllers[app_name]);
            break;
        case 'PUT' :
            vc.onPut(meta, req, res, data_controllers[app_name]);
            break;
        case 'DELETE' :
            vc.onDelete(meta, req, res, data_controllers[app_name]);
            break;
    }
}

function handle_response(meta, status, data){

    if (meta.response_type == 'html'){
        var code = parseInt(status.code) || 200;
        switch (code){
            default:
            case 200:
                meta.response.render(meta.html_file, {meta:meta, data:data});
                break;
            case 404:
                meta.response.render("404.html");
                break;
            case 504:
                meta.add_flash('danger', status.message+'');
                meta.response.redirect(meta.url_to_app);
                break;
        }
    }
    else if(meta.response_type == 'json'){
        var json = {};
        json.status = status;
        json.data = data;

        meta.response.send(json);
    }
}

function isJSExt(full_file_name){

    var parts = full_file_name.split('.');
    return (parts[parts.length-1] != 'js') ? false : true;
}