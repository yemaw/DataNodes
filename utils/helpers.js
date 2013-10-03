/**
 * Created by YeMaw on 210//13.
 */


exports.get_view_path = function(params){
    return params.local_path+params.segments[0]+'/view'+params.segments[1]+'.html.html';
}