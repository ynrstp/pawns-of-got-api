var mongoose = require('mongoose');

var PawnSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    quote: {
        type: String,
        required: true,
        unique: false
    },
    house: {
        type: String,
        required: true,
        unique: false
    },
    status: {
        type: String,
        required: true,
        unique: false
    },
    location: {
        type: String,
        required: true,
        unique: false
    }


});

module.exports = mongoose.model('Pawn', PawnSchema);
