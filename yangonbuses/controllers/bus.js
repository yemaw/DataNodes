/**
 * Created by YeMaw on 210//13.
 */


var db = require("./../db.js");

exports.get_many_buses = function(where, callback){

    var status = {code:200};
    db.Buses.find(where).exec(function(err, buses){
        if(err){status = {code:504, message: err.message}}
        callback(status, buses);
    });
}

exports.get_single_bus_by_id = function(id, callback){

    var status = {code:200};
    db.Buses.findById(id, function(err, bus){
        if(err){status = {code:504, message:err.message}}
        callback(status, bus);
    });
}

exports.create_single_bus = function(busIn, callback){

    var status = {code:200};
    db.Buses.create(busIn, function(err, bus){
        if(err){status = {code:504, message:err.message}}
        callback(status, bus);
    });
}

exports.update_single_bus = function(busIn, callback){

    var status = {code:200};
    db.Buses.findByIdAndUpdate(busIn.id, busIn, {}, function(err, bus){
        if(err){status = {code:504, message:err.message}}
        callback(status, bus);
    });
}

exports.update_bus_pathpoints_order_by_busid = function(bus_id, busstops_in_order, /*1 or 2*/bus_path, callback){

    var status = {code:200};
    var pathpoints = [];
    for(var i = 0; i < busstops_in_order.length; i++){
        if(busstops_in_order[i] && bus_id && bus_path){
            pathpoints.push({bus: bus_id, busstop: busstops_in_order[i], order: i+1, bus_path:bus_path});
        }
    }

    db.PathPoints.remove({bus: bus_id, bus_path: bus_path}, function(err){
        if(err){
            status = {code:504, message:err.message}
            callback(status,null);return;
        }

        db.PathPoints.create(pathpoints, function(err, pathpoints){
        if(err){status = {code:504, message:err.message}}
            callback(status, pathpoints);
        });

    });
}

exports.get_bus_pathpoints_by_busid = function(bus_id, path_number, callback){

    var status = {code:200};
    db.PathPoints.find({bus:bus_id, bus_path:path_number}).populate('busstop').exec(function(err, pathpoints){
        if(err){status = {code:504, message:err.message}}
        callback(status, pathpoints);
    });
}

exports.get_many_raw_pathpoints = function(where, callback){
    var status = {code:200};
    db.PathPoints.find(where).exec(function(err, pathpoints){
        if(err){status = {code:504, message:err.message}}
        callback(status, pathpoints);
    });
}

//---------------------------------------------

function get_many_buses(where, callback){
    Bus.find().exec(callback);
}

function get_single_bus(id, callback){
    Bus.findOne({'_id':id}).populate('operator').exec(callback);
}

function create_single_bus(bus, callback){
    Bus.create(bus, function(err, result){
        callback(err, result);
    });
}
function update_single_bus(bus, callback){
    Bus.findByIdAndUpdate(bus.id, bus, {}, callback);
}

function update_bus_pathpoints_order(bus_id, busstops_order, /*1 or 2*/bus_path, callback){
    var busstops_in_order = busstops_order.split(',');
    var pathpoints = [];
    for(var i = 0; i < busstops_in_order.length; i++){
        if(busstops_in_order[i] && bus_id && bus_path){
            pathpoints.push({bus: bus_id, busstop: busstops_in_order[i], order: i+1, bus_path:bus_path});
        }
    }

    PathPoint.remove({bus: bus_id, bus_path: bus_path}, function(err, pathpoint){
        if(!err){
            PathPoint.create(pathpoints, function(err, pathpoints){
                callback(err, pathpoints);
            });
        }
    });
}

function get_bus_pathpoints(bus_id, bus_path, callback){
    PathPoint.find({bus:bus_id, bus_path:bus_path}).populate('busstop').exec(callback);
}

function get_many_bus_pathpoints(where, callback){
    PathPoint.find(where).populate('busstop').populate('bus').exec(callback);
}