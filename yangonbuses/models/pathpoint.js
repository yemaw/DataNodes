/**
 * Created by YeMaw on 1210//13.
 */


var mongoose = require("./../mongoose.js");
var Schema = mongoose.Schema;

var PathPointSchema = new Schema({
    bus : {type: String, ref:'bus'},
    busstop: { type: String, ref: 'busstop' },
    order: Number,
    bus_path: {type:Number, min:1, max:2, default:1}
},
{
    collection : 'pathpoints',
    versionKey: false
});

module.exports = exports = mongoose.model('pathpoint',PathPointSchema);
