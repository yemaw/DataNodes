/**
 * Created by YeMaw on 710//13.
 */


var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Bus = new Schema({
    bus_id      : String,
    bus_name_en : String,
    bus_name_mm : String
});

mongoose.model( 'Bus', Bus );

mongoose.connect( 'mongodb://localhost/express-todo' );