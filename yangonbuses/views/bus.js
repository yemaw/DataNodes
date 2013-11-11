/**
 * Created by YeMaw on 1510//13.
 */


var async = require('async');

exports.onGet = function(meta, req, res, controllers){
    async.series({
            bus: function(callback){
                controllers.bus.get_single_bus_by_id(meta.id, function(err, bus){

                    //console.log('1'+bus);
                    callback(null, bus);
                });
            },
            operators: function(callback){
                controllers.operator.get_many_operators({},function(err1, operators){
                    callback(null, operators);
                });
            }
        },
        function(err, results) {
            //console.log('3'+err.message);
            meta.do_response(meta, {code:200}, results);
        });
}

exports.onPost = function(meta, req, res, controllers){
    var busIn = req.body;

    if(busIn.id){
        controllers.bus.update_single_bus(busIn, function(status, bus){
            meta.add_flash(status.code == 200 ? 'success' : 'danger', status.code == 200 ? 'Success' : status.message);
            res.redirect(meta.full_url);
        });
    } else {
        controllers.bus.create_single_bus(busIn, function(status, bus){
            meta.add_flash(status.code == 200 ? 'success' : 'danger', status.code == 200 ? 'Success' : status.message);
            res.redirect(meta.full_url+bus.id);
        });
    }
}