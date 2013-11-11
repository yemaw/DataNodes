/**
 * Created by YeMaw on 1510//13.
 */

exports.onGet = function(meta, req, res, controllers){

    controllers.bus.get_single_bus_by_id(meta.id,function(status, bus){
        controllers.busstop.get_many_busstops({}, function(status, busstops){
            controllers.bus.get_bus_pathpoints_by_busid(bus.id, meta.queries.bus_path, function(status, pathpoints){
                var _status = {code:200};
                meta.do_response(meta, _status,{bus:bus, pathpoints: pathpoints, bus_path: meta.queries.bus_path , busstops:busstops});
            });
        });
    });
}

exports.onPost = function(meta, req, res, controllers){

    var bus_id = req.body.bus_id;
    var busstops_in_order = req.body.busstops_order.split(',');
    var bus_path = req.body.bus_path;
    controllers.bus.update_bus_pathpoints_order_by_busid(bus_id, busstops_in_order, bus_path, function(status, pathpoints){

        controllers.bus.get_single_bus_by_id(meta.id,function(status, bus){
            controllers.busstop.get_many_busstops({}, function(status, busstops){
                controllers.bus.get_bus_pathpoints_by_busid(bus.id, meta.queries.bus_path, function(status, pathpoints){
                    var _status = {code:200};
                    res.redirect(meta.full_url);
                    //meta.do_response(meta, _status,{bus:bus, pathpoints: pathpoints, bus_path: meta.queries.bus_path , busstops:busstops});
                });
            });
        });
    });
}