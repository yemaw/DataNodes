/**
 * Created by YeMaw on 210//13.
 */

var db = require('./../db.js');

exports.get_many_operators = function(where, callback){
    var status = {code:200};
    db.Operators.find(where).exec(function(err, operators){
        if(err){status = {code:504, message: err.message}}//#TODO:translate the error
        callback(status, operators);
    });
}

exports.get_single_operator_by_id = function(id, callback){

    var status = {code:200};
    db.Operators.findById(id, function(err, operator){
        if(err){status = {code:504, message:err.message}}
        callback(status, operator);
    });
}

exports.create_single_operator = function(operatorIn, callback){

    var status = {code:200};
    db.Operators.create(operatorIn, function(err, operator){
        if(err){status = {code:504, message:err.message}}
        callback(status, operator);
    });
}

exports.update_single_operator = function(operator, callback){

    var status = {code:200};
    db.Operators.findByIdAndUpdate(operator.id, operator, {}, function(err, operator){
        if(err){status = {code:504, message:err.message}}
        callback(status, operator);
    });
}

//=============================================================================
/*

 var db = require('./../db.js');

 var mongo = require('mongodb');
 var BSON = mongo.BSONPure;

function get_many_operator(where, callback){
    db.collection('operators', function(err, collection) {
        collection.find().toArray(function(err, data){
            callback(null, data);
        });
    });
}

function create_single_operator(operator, callback){

    operator._id = operator.id = BSON.ObjectID().toString();
    operator.enable = true;

    db.collection('operators', function(err, collection) {
        collection.insert(operator, {safe:true}, function(err, result) {
            if (!err){
                console.log('Inserted: ' + JSON.stringify(result[0]));
                callback(null, result[0]);
            }
        });
    });
}

function get_single_operator(id, callback){
    db.collection('operators', function(err, collection){
        collection.findOne({'id': id}, function(err, data){
            if(!err){
                callback(err, data);
            }
        });
    });
}

function update_single_operator(operator, callback){
    db.collection('operators', function (err, collection){
        collection.update({'id':operator.id}, operator, {safe:false}, function(err, result) {
            if (!err) {
                callback(err, result);
            }
        });
    });
}
*/
//=============================================================================
/*
var Parse = require('parse').Parse;

function actionGetListOfOperators(where, callback){

    Parse.initialize("4Rl57IjYRNU9lQAuTVuLAqg0KJth7HohxbOv8xS8", "BdKx3oG9OPP8lKxz9BuaeO7pl0NKOrWR4UfRBfcM");

    var Operator = Parse.Object.extend("Operator");
    var query = new Parse.Query(Operator);

    //query.equalTo();
    query.find({
        success: function(results) {
            data = results;
            for (var i = 0; i < results.length; i++) {
                console.log(results[i].get('operator_name_en'));
            }
           // console.log(results.toJSON());
            callback(null, data);
        },
        error: function(error) {
            callback(error, null);
        }
    });
}

function actionGetSingleOperator(where, callback){

    callback();
}

function actionCreateOperator(operator, callback){

    callback();
}

function actionUpdateOperator(operator, callback){

    callback();
}

    */