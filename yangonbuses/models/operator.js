/**
 * Created by YeMaw on 1510//13.
 */

var mongoose = require("./../mongoose.js");
var Schema = mongoose.Schema;

var OperatorSchema = new Schema({
    operator_name_en: String,
    operator_name_my: String
},
{
    collection : 'operators',
    versionKey: false
});

module.exports = exports = mongoose.model('operator',OperatorSchema);
