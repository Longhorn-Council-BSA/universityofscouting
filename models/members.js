// jshint.unstable bigint: true
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

Members = mongoose.model('Members', new mongoose.Schema({
    memberID: {
        type: SchemaTypes.Long,
        required: true
    },
    councilID: {
        type: Number,
        default: 662,
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
    access: {
        type: Number,
        default: 1,
        required: true
    }
}));

module.exports = Members;
