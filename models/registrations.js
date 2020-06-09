// jshint.unstable bigint: true
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

Registrations = mongoose.model('Registrations', new mongoose.Schema({
    memberID: {
        type: SchemaTypes.Long,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: 'Unknown'
    }
}));

module.exports = Registrations;
