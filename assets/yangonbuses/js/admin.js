/**
 * Created by YeMaw on 1010//13.
 */

$(document).ready(function(){
    $("#editpath_addbus").click(function(){
        //$("#editpath_sortboard").append(
            //'<li id="'+$("#editpath_busselect option:selected").val()+'" class="ui-state-highlight">'
            //    +$("#editpath_busselect option:selected").text()
            //    +'<a href="#" onclick="remove_busstop(this)" class="editpath_removebusstop btn btn-default btn-xs pull-right"> x </a>'
            //+'</li>'
        //);
        append_busstop_to_board($("#editpath_busselect option:selected").val(), $("#editpath_busselect option:selected").text());
        update_busstops_order();
    });

    /* Not working to dynamic added <li> */
    $(".editpath_removebusstop").click(function(){
        $(this).parent('li').remove();
    });

    $("#editpath_sortboard").sortable({
        update: function(event, ui) {
            update_busstops_order();
        }
    });

    $("#editpath_sortboard").disableSelection();

    update_busstops_order();

    var busstops_list = [];
    $.get("http://localhost:3000/api/yangonbuses/v1/all", function( results ) {
        for(var i=0; i<results.data.busstops.length;i++){
            busstops_list[i] = {id:results.data.busstops[i]._id, label: results.data.busstops[i].busstop_name_my+ " - "+results.data.busstops[i].busstop_name_en};
        }
    });
    $("#autocomplete_busstops").autocomplete({
            source: busstops_list,
            minLength: 0,
            select: function( event, ui ) {
                append_busstop_to_board(ui.item.id, ui.item.label);
                $(this).val('');
                show_flash('Added at the bottom', 'success', 1500);
                return false;
            }
    });

});

function append_busstop_to_board(busstop_id, busstop_name){
    $("#editpath_sortboard").append(
        '<li id="'+busstop_id+'" class="ui-state-highlight">'
            +busstop_name
            +'<a href="#" onclick="remove_busstop(this)" class="editpath_removebusstop btn btn-default btn-xs pull-right"> x </a>'
            +'</li>'
    );
    update_busstops_order();
}

function update_busstops_order(){
    $("#busstops_order").val(($("#editpath_sortboard").sortable("toArray").toString()));
}
function remove_busstop(close_btn){
    $(close_btn).parent('li').remove();
    update_busstops_order();
}

function show_flash(message, type, timeout){
    var tmp_id = "__"+Date.now();
    $("#flashes").append('<div class="alert alert-'+ type +' '+tmp_id+'">'+message+'</div>');
    $('.'+tmp_id).fadeOut(timeout || 1500);
}
