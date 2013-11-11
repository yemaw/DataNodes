
/**
 * Created by YeMaw on 2210//13.
 */


var async = require("async");

exports.onGet = function(meta, req, res, controllers){
    async.series({
            buses: function(callback){
                controllers.bus.get_many_buses({}, function(status, buses){

                    callback(null, buses);
                });
            },
            busstops:function(callback){
                controllers.busstop.get_many_busstops({}, function(status, busstops){

                    callback(null, busstops);
                });
            },
            pathpoints:function(callback){
                controllers.bus.get_many_raw_pathpoints({}, function(status, pathpoints){

                    callback(null, pathpoints);
                });
            },
            operators:function(callback){
                controllers.operator.get_many_operators({}, function(status, operators){

                    callback(null, operators);
                });
            }
        },
        function(err, results) {

            meta.do_response(meta, {code:200}, results);
        });
}