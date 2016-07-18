var multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, process.env.LOCATIONPATH)
    },
    filename: function(req, file, cb) {
        cb(null, req.body.name.replace(/\s/g, '') + '.jpg')
    }
})

var upload = multer({
    storage: storage
});

var _ = require('lodash');
var Location = require('../models/location.js');

module.exports = function(app) {

    /* Create */
    app.post('/location', upload.single('location'), function(req, res) {
        var newLocation = new Location(req.body)
        newLocation.save(function(err) {
            if (err) {
                res.json({
                    info: 'error during location create',
                    error: err
                });
            } else {
                res.json({
                    info: 'location created successfully'
                })
            }
        });
    });

    /* Read */
    app.get('/location', function(req, res) {
        Location.find(function(err, locations) {
            if (err) {
                res.json({
                    info: 'error during find locations',
                    error: err
                });
            } else {
                res.json({
                    info: 'locations found successfully',
                    data: locations
                })
            }

        });
    });

    app.get('/location/:id', function(req, res) {
        Location.findById(req.params.id, function(err, locations) {
            if (err) {
                res.json({
                    info: 'error during find location',
                    error: err
                });
            };
            if (location) {
                res.json({
                    info: 'location found successfully',
                    data: location
                });
            } else {
                res.json({
                    info: 'location not found'
                });
            }
        });
    });

    /* Update */
    app.put('/location/:id', upload.array(), function(req, res) {
        Location.findById(req.params.id, function(err, location) {
            if (err) {
                res.json({
                    info: 'error during find location',
                    error: err
                });
            };
            if (location) {
                _.merge(locations, req.body);
                location.save(function(err) {
                    if (err) {
                        res.json({
                            info: 'error during locations update',
                            error: err
                        });
                    } else {
                        res.json({
                            info: 'location updated successfully'
                        })
                    }
                });
            } else {
                res.json({
                    info: 'location not found'
                });
            }

        });
    });

    /* Delete */
    app.delete('/location/:id', function(req, res) {
        Location.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: 'error during remove location',
                    error: err
                });
            } else {
                res.json({
                    info: 'location removed successfully'
                })
            }
        });
    });

};
