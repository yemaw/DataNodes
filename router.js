/**
 * NodeIgniter
 * Created by YeMaw on 110//13.
 * version 0.1
 */

var fs  = require('fs');
var url = require('url');

exports.route = route;
exports.initialize = initialize;

var view_controllers = {};
var params = [];
var dir;

function initialize(path_component_root){

    dir = path_component_root;

    var path_viewcontrollers = path_component_root+'views/';

    fs.readdir(path_viewcontrollers, function(error, items){

        if(error){
            console.log(error);
            return;
        }
        items.forEach(function(item){
            fs.stat(path_viewcontrollers+item, function(err, stats){
                if(stats.isFile()){
                    var file_name_full = item.toString();

                    var file_ext = file_name_full.slice(file_name_full.length-3, file_name_full.length); //getting file extension
                    if(file_ext != '.js'){return;} //#TODO:Better extension slice for more than 2 chracter

                    var file_name = file_name_full.substring(0, item.toString().length-3); //removing '.js'
                    view_controllers[file_name] = require(path_viewcontrollers+item);

                }
            });
        });
    });

}

function route(req, res, subapp_segment_index){

    subapp_segment_index = subapp_segment_index || 0;

    var uris = url.parse(req.url,true, true);
    var all_segments = uris.pathname.substring(1).split('/');

    var sub_segments = [];
    for(var i=0; i<all_segments.length-subapp_segment_index; i++){
        sub_segments[i] = all_segments[i+subapp_segment_index];
    }
    if(sub_segments[1] == null || sub_segments[1] == ''){
        sub_segments[1] = 'default';
    }

    var params = [];

    params.request = req;
    params.response = res;

    params.url = req.protocol + "://" + req.get('host') + req.url;
    params.protocol = req.protocol;
    params.host = req.get('host');
    params.segments = sub_segments;
    params.query = uris.query;

    params.local_path = dir;

    view_controllers[sub_segments[0]][sub_segments[1]](req, res, params);
}
