/**
 * Created by YeMaw on 110//13.
 */

exports.default = list;
exports.list = list;
exports.view = view;
exports.edit = edit;

var controller = require('./controller');
var helper = require('./helpers.js');

var data = [{'name':'Par Ra Mi','id':'123'},{'name':'Shwe Inn Wa', 'id':'124'}];


function list(req, res, params){
    controller.actionGetListOfOperator(null, function(error, data){
        if(error){console.log(error);}

        res.render(zit.get_ui_file(params),{data:data});
    })

};

function view(req, res, params){
    res.send("operator view");
}

function edit(req, res, params){
    res.send("operator edit");
}

