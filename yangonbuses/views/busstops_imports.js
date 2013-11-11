/**
 * Created by YeMaw on 2210//13.
 */
var Parse = require('parse').Parse;


exports.onGet = function(meta, req, res, controllers){
    getBuses({}, function(err, results){
        for(var i=0; i<results.length; i++){
            var busstop = {};
            busstop.busstop_name_en = results[i].get('busstop_name_en');
            busstop.busstop_name_my = results[i].get('busstop_name_my');
            controllers.busstop.create_single_busstop(busstop,function(status, busstopa){
                console.log(busstopa);
            });
        }
    });

}



function getBuses(where, callback){

    Parse.initialize("4Rl57IjYRNU9lQAuTVuLAqg0KJth7HohxbOv8xS8", "BdKx3oG9OPP8lKxz9BuaeO7pl0NKOrWR4UfRBfcM");

    var BusStop = Parse.Object.extend("BusStop");
    var query = new Parse.Query(BusStop);
    query.limit(1000);
    //query.equalTo();
    query.find({
        success: function(results) {
            console.log("r => "+results.length);
            //for (var i = 0; i < results.length; i++) {

           // }
            // console.log(results.toJSON());
            callback(null, results);
        },
        error: function(error) {
            callback(error, null);
        }
    });
}

/*
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
    */