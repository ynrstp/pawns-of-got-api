var mongoose = require('mongoose');

var LocationSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },

});

module.exports = mongoose.model('Location', LocationSchema);
