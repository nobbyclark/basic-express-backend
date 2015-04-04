var express = require('express');
var router = express.Router();
var Artist = require('../models/Artist');

router.post('/', function(req, res) {

  var name = req.body.artist.name.trim();

  if (name) {
    var artist = new Artist();
    
    artist.name = name;

    artist.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ "artist": artist });
    });
  } else {
    res.status(422).json({ "errors": { "name": ["Artist name cannot be blank."] } });
  }
});

router.get('/', function(req, res) {
  Artist.find(function(err, artists) {
    if (err) {
      res.send(err);
    }

    res.json({ "artists": artists });
  });
});

router.get('/:artist_id', function(req, res) {
  Artist.findById(req.params.artist_id, function(err, artist) {
    if (err) {
      res.send(err);
    }

    if (artist) {
      res.json({ "artist": artist });
    } else {
      res.sendStatus(404);
    }
  });
});

router.put('/:artist_id', function(req, res) {
  Artist.findById(req.params.artist_id, function(err, artist) {
    if (err) {
      res.send(err);
    }

    if (artist) {
      var name = req.body.artist.name.trim();

      if (name) {
        artist.name = name;

        artist.save(function(err) {
          if (err) {
            res.send(err);
          }

          res.json({ "artist": artist });
        });
      } else {
        res.status(422).json({ "errors": { "name": ["Artist name cannot be blank."] } });
      }
    } else {
      res.sendStatus(404);
    }
  });
});

router.delete('/:artist_id', function(req, res) {
  Artist.findById(req.params.artist_id, function(err, artist) {

    if (artist) {
      Artist.remove({
      _id: req.params.artist_id
      }, function(err, artist) {
        if (err) {
          res.send(err);
        }
        res.json({});
      });
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;
