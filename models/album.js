var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    name: String,
    artist: { type: mongoose.Schema.ObjectId, ref: 'Artist' }
});

module.exports = mongoose.model('Album', AlbumSchema);