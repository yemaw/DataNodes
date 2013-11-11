/**
 * Created by YeMaw on 2110//13.
 */

exports.onGet = function(meta, req, res, controllers){
    controllers.busstop.get_many_busstops({},function(status, busstops){
        console.log(busstops.length);
        meta.do_response(meta, status, {busstops: busstops});
    });
}