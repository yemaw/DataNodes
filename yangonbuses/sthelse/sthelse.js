/**
 * Created by YeMaw on 110//13.
 */

exports.list = list;
exports.view = view;
exports.edit = edit;

function list(req, res){
    res.send("else list");
};

function view(req, res){
    res.send("else view");
}

function edit(req, res){
    res.send("else edit");
}