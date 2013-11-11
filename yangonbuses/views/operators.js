

exports.onGet = function(meta, req, res, controllers){
    controllers.operator.get_many_operators({},function(status, operators){
        meta.do_response(meta, status, {operators: operators});
    });
}


