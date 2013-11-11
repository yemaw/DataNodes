/**
 * Created by YeMaw on 1510//13.
 */

var mongoose = require("./../mongoose.js");
var Schema = mongoose.Schema;

var BusStopSchema = new Schema({
    busstop_name_en: String,
    busstop_name_my: String,
    busstop_location_longitude: {type:String, default: ''},
    busstop_location_latitude: {type:String, default: ''}
},
{
    collection : 'busstops',
    versionKey: false
});

module.exports = exports = mongoose.model('busstop',BusStopSchema);
