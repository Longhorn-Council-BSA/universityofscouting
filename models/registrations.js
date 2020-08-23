// jshint.unstable bigint: true
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

Registrations = mongoose.model('Registrations', new mongoose.Schema({
    memberID: {
        type: SchemaTypes.Long,
        required: true
    },
    councilID: {
        type: Number,
        default: 662,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: Number,
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
    instructor: {
        type: String,
        required: true
    },
    physical: {
        type: String,
        required: true
    },
    online: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 1
    }
}));

Registrations.index({ memberID: 1, councilID: 1 });

module.exports = Registrations;
