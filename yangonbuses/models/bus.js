/**
 * Created by YeMaw on 1210//13.
 */

var mongoose = require("./../mongoose.js");
var Schema = mongoose.Schema;

var BusSchema = new Schema({
    bus_name_en: String,
    bus_name_my: String,
    bus_color: String,
    operator:{ type: String, ref: 'operator' }
},
{
    collection : 'buses',
    versionKey: false
});

module.exports = exports = mongoose.model('bus',BusSchema);
