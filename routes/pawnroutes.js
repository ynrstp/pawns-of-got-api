var multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, process.env.AVATARPATH)
    },
    filename: function(req, file, cb) {
        cb(null, req.body.name.replace(/\s/g, '') + '.jpg')
    }
})

var upload = multer({
    storage: storage
});

var _ = require('lodash');
var Pawn = require('../models/pawn.js');

module.exports = function(app) {

    /* Create */
    app.post('/pawn', upload.single('avatar'), function(req, res) {
        var newPawn = new Pawn(req.body)
        newPawn.save(function(err) {
            if (err) {
                res.json({
                    info: 'error during pawn create',
                    error: err
                });
            } else {
                res.json({
                    info: 'pawn created successfully'
                })
            }
        });
    });

    /* Read */
    app.get('/pawn', function(req, res) {
        Pawn.find(function(err, pawns) {
            if (err) {
                res.json({
                    info: 'error during find pawns',
                    error: err
                });
            } else {
                res.json({
                    info: 'pawns found successfully',
                    data: pawns
                })
            }

        });
    });

    app.get('/pawn/:id', function(req, res) {
        Pawn.findById(req.params.id, function(err, pawn) {
            if (err) {
                res.json({
                    info: 'error during find pawn',
                    error: err
                });
            };
            if (pawn) {
                res.json({
                    info: 'pawn found successfully',
                    data: pawn
                });
            } else {
                res.json({
                    info: 'pawn not found'
                });
            }
        });
    });

    /* Update */
    app.put('/pawn/:id', upload.array(), function(req, res) {
        console.log(req.body    )
        Pawn.findById(req.params.id, function(err, pawn) {
            if (err) {
                res.json({
                    info: 'error during find pawn',
                    error: err
                });
            };
            if (pawn) {
                _.merge(pawn, req.body);
                pawn.save(function(err) {
                    if (err) {
                        res.json({
                            info: 'error during pawn update',
                            error: err
                        });
                    } else {
                        res.json({
                            info: 'pawn updated successfully'
                        })
                    }
                });
            } else {
                res.json({
                    info: 'pawn not found'
                });
            }

        });
    });

    /* Delete */
    app.delete('/pawn/:id', function(req, res) {
        Pawn.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: 'error during remove pawn',
                    error: err
                });
            } else {
                res.json({
                    info: 'pawn removed successfully'
                })
            }
        });
    });

};
