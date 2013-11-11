/**
 * Created by YeMaw on 2110//13.
 */

exports.onGet = function(meta, req, res, controllers ){
    if(meta.id == ''){ //new
        meta.do_response(meta, {code:200}, {});
    }
    else{//edit
        controllers.operator.get_single_operator_by_id(meta.id,function(status, operator){
            meta.do_response(meta, status, {operator: operator});
        });
    }
}

exports.onPut = exports.onPost = function(meta, req, res, controllers){

    var operatorIn = req.body;
    if(operatorIn.id){
        controllers.operator.update_single_operator(operatorIn, function(status, operator){
            meta.add_flash(status.code == 200 ? 'success' : 'danger', status.code == 200 ? 'Success' : status.message);
            res.redirect(meta.full_url);
        });
    } else {
        controllers.operator.create_single_operator(operatorIn, function(status, operator){
            meta.add_flash(status.code == 200 ? 'success' : 'danger', status.code == 200 ? 'Success' : status.message);
            res.redirect(meta.full_url+operator.id);
        });
    }
}

