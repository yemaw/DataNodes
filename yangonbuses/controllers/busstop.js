/**
 * Created by YeMaw on 1510//13.
 */

var db = require('./../db.js');

exports.get_many_busstops = function(where, callback){
    var status = {code:200};
    db.BusStops.find(where).exec(function(err, busstops){
        if(err){status = {code:504, message: err.message}}//#TODO:translate the error
        callback(status, busstops);
    });
}

exports.get_single_busstop_by_id = function(id, callback){

    var status = {code:200};
    db.BusStops.findById(id, function(err, busstop){
        if(err){status = {code:504, message:err.message}}
        callback(status, busstop);
    });
}

exports.create_single_busstop = function(busstopIn, callback){

    var status = {code:200};
    db.BusStops.create(busstopIn, function(err, busstop){
        if(err){status = {code:504, message:err.message}}
        callback(status, busstop);
    });
}

exports.update_single_busstop = function(busstopIn, callback){

    var status = {code:200};
    db.BusStops.findByIdAndUpdate(busstopIn.id, busstopIn, {}, function(err, busstop){
        if(err){status = {code:504, message:err.message}}
        callback(status, busstop);
    });
}

//-----------------------------------------------------------
/*
var BusStop = require('../models/busstop');

function get_many_busstop(where, callback){

    BusStop.find().exec(callback);
}

function get_single_busstop(id, callback){
    BusStop.findById(id, callback);
}

function create_single_busstop(busstop, callback){
    BusStop.create(busstop, function(err, result){
        if(!err){
            callback(null, result);
        }
    });
}

function update_single_busstop(busstop, callback){
    BusStop.findByIdAndUpdate(busstop.id, busstop, {}, callback);
}

*/

