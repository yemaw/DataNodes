/**
 * NodeIgniter
 * Created by YeMaw on 110//13.
 * version 0.1
 */

var fs  = require('fs');
var url = require('url');

exports.route = route;
exports.initialize = initialize;

var controllers = {};
var params = [];
var dir;

function initialize(path_to_dir){
    dir = path_to_dir;
    fs.readdir(path_to_dir, function(error, items){

        if(error){
            console.log(error);
            return;
        }

        items.forEach(function(item){
            fs.stat(path_to_dir+item, function(err, stats){
                if(stats.isDirectory()){
                    controllers[item] = require(path_to_dir+item+'/'+item+'.js');
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
    if(sub_segments[1] == null){
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

    controllers[sub_segments[0]][sub_segments[1]](req, res, params);
}