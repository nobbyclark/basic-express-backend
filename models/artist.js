var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
    name: String,
    albums: [{ type: mongoose.Schema.ObjectId, ref: 'Album' }]
});

module.exports = mongoose.model('Artist', ArtistSchema);