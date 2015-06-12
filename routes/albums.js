var express = require('express');
var router = express.Router();
var Album = require('../models/Album');

router.post('/', function(req, res) {

  var album = new Album(req.body.album);

  album.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ album: album });
  });

});

router.get('/', function(req, res) {

  Album.find(function(err, albums) {
    if (err) {
      res.send(err);
    }

    res.json({ albums: albums });
  });

});

router.get('/:album_id', function(req, res) {

  Album.findById(req.params.album_id, function(err, album) {
    if (err) {
      res.send(err);
    }

    if (album) {
      res.json({ album: album });
    } else {
      res.sendStatus(404);
    }
  });

});

router.put('/:album_id', function(req, res) {

  Album.findByIdAndUpdate(req.params.album_id, { $set: req.body.album }, function(err, album) {
    if (err) {
      res.send(err);
    }

    res.json({ album: album });
  });

});

router.delete('/:album_id', function(req, res) {

  Album.findByIdAndRemove(req.params.album_id, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({});
  });

});

module.exports = router;
