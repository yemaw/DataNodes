/**
 * Created by YeMaw on 210//13.
 */

exports.actionGetListOfOperator = actionGetListOfOperators;


var Parse = require('parse').Parse;


function actionGetListOfOperators(where, callback){

    Parse.initialize("", "");

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