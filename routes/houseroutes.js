var multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, process.env.HOUSEPATH)
    },
    filename: function(req, file, cb) {
        cb(null, req.body.name.replace(/\s/g, '') + '.png')
    }
})

var upload = multer({
    storage: storage
});

var _ = require('lodash');
var House = require('../models/house.js');

module.exports = function(app) {

    /* Create */
    app.post('/house', upload.single('house'), function(req, res) {
        var newHouse = new House(req.body)
        newHouse.save(function(err) {
            if (err) {
                res.json({
                    info: 'error during house create',
                    error: err
                });
            } else {
                res.json({
                    info: 'house created successfully'
                })
            }
        });
    });

    /* Read */
    app.get('/house', function(req, res) {
        House.find(function(err, houses) {
            if (err) {
                res.json({
                    info: 'error during find houses',
                    error: err
                });
            } else {
                res.json({
                    info: 'houses found successfully',
                    data: houses
                })
            }

        });
    });

    app.get('/house/:id', function(req, res) {
        House.findById(req.params.id, function(err, houses) {
            if (err) {
                res.json({
                    info: 'error during find house',
                    error: err
                });
            };
            if (house) {
                res.json({
                    info: 'house found successfully',
                    data: house
                });
            } else {
                res.json({
                    info: 'house not found'
                });
            }
        });
    });

    /* Update */
    app.put('/house/:id', upload.array(), function(req, res) {
        House.findById(req.params.id, function(err, house) {
            if (err) {
                res.json({
                    info: 'error during find house',
                    error: err
                });
            };
            if (house) {
                _.merge(houses, req.body);
                house.save(function(err) {
                    if (err) {
                        res.json({
                            info: 'error during houses update',
                            error: err
                        });
                    } else {
                        res.json({
                            info: 'house updated successfully'
                        })
                    }
                });
            } else {
                res.json({
                    info: 'house not found'
                });
            }

        });
    });

    /* Delete */
    app.delete('/house/:id', function(req, res) {
        House.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: 'error during remove house',
                    error: err
                });
            } else {
                res.json({
                    info: 'house removed successfully'
                })
            }
        });
    });

};
