/**
 * Created by YeMaw on 2110//13.
 */

exports.onGet = function(meta, req, res, controllers ){
    if(meta.id == ''){ //new
        meta.do_response(meta, {code:200}, {});
    }
    else{//edit
        controllers.busstop.get_single_busstop_by_id(meta.id,function(status, busstop){
            meta.do_response(meta, status, {busstop: busstop});
        });
    }
}

exports.onPost = function(meta, req, res, controllers){

    var busstopIn = req.body;

    if(busstopIn.id){
        controllers.busstop.update_single_busstop(busstopIn, function(status, busstop){
            meta.add_flash(status.code == 200 ? 'success' : 'danger', status.code == 200 ? 'Success' : status.message);
            res.redirect(meta.full_url);
        });
    } else {
        controllers.busstop.create_single_busstop(busstopIn, function(status, busstop){
            meta.add_flash(status.code == 200 ? 'success' : 'danger', status.code == 200 ? 'Success' : status.message);
            res.redirect(meta.full_url+busstop.id);
        });
    }
}
