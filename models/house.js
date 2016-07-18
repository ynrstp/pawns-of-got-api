var mongoose = require('mongoose');

var HouseSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },

});

module.exports = mongoose.model('House', HouseSchema);
