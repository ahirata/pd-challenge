'use strict';

var config = require('../config/config');
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    name: String,
    artist: String,
    genre: String,
    year: { type: Number, es_indexed: false },
    tags: [String],
    tracks: [String]
});

AlbumSchema.plugin(mongoosastic, config.mongoosastic);

module.exports = mongoose.model('Album', AlbumSchema);
