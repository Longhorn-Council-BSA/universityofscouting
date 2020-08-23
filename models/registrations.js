// jshint.unstable bigint: true
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var councils = require('../data/councils');
var SchemaTypes = mongoose.Schema.Types;

RegistrationsSchema = new mongoose.Schema({
    memberID: {
        type: SchemaTypes.Long,
        required: true
    },
    councilID: {
        type: Number,
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
});

RegistrationsSchema.virtual('councilName').get(function() {
    return councils[this.councilID];
});

RegistrationsSchema.index({ memberID: 1, councilID: 1 });

module.exports = mongoose.model('Registrations', RegistrationsSchema);
