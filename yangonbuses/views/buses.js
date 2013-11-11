/**
 * Created by YeMaw on 2110//13.
 */

exports.onGet = function(meta, req, res, controllers){
    controllers.bus.get_many_buses({},function(status, buses){
        meta.do_response(meta, status, {buses: buses});
    });
}