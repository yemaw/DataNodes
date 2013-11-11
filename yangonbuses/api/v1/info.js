/**
 * Created by YeMaw on 3010//13.
 */

exports.onGet = function(meta, req, res, controllers){
    meta.do_response(meta, {code:200}, {"db_version":"3.1"});
}