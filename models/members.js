// jshint.unstable bigint: true
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

Members = mongoose.model('Members', new mongoose.Schema({
    memberID: {
        type: SchemaTypes.Long,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    council: {
        type: String,
        required: false
    },
    access: {
        type: Number,
        default: 1,
        required: true
    }
}));

module.exports = Members;
