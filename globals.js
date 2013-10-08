/**
 * Created by YeMaw on 710//13.
 */



exports.get_interface_file = function(params){
    return params.local_path+'interfaces/'+params.segments[0]+'/'+params.segments[1]+'.html';
}