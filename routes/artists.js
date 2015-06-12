var express = require('express');
var router = express.Router();
var Artist = require('../models/Artist');

router.post('/', function(req, res) {

  var artist = new Artist(req.body.artist);

  artist.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ artist: artist });
  });

});

router.get('/', function(req, res) {

  Artist.find(function(err, artists) {
    if (err) {
      res.send(err);
    }

    res.json({ artists: artists });
  });

});

router.get('/:artist_id', function(req, res) {

  Artist.findById(req.params.artist_id, function(err, artist) {
    if (err) {
      res.send(err);
    }

    if (artist) {
      res.json({ artist: artist });
    } else {
      res.sendStatus(404);
    }
  });

});

router.put('/:artist_id', function(req, res) {

  Artist.findByIdAndUpdate(req.params.artist_id, { $set: req.body.artist }, function(err, artist) {
    if (err) {
      res.send(err);
    }

    res.json({ "artist": artist });
  });

});

router.delete('/:artist_id', function(req, res) {

  Artist.findByIdAndRemove(req.params.artist_id, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({});
  });
  
});

module.exports = router;
