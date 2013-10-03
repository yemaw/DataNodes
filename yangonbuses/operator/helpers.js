/**
 * Created by YeMaw on 210//13.
 */


exports.get_view_file = function(params){
    return params.local_path+params.segments[0]+'/views/'+params.segments[1]+'.html';
}