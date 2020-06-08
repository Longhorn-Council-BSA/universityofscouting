var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

TranscriptEntries = mongoose.model('TranscriptEntries', new mongoose.Schema({
    memberID: {
        type: SchemaTypes.Long,
        min: 1000,
        max: 9999999999999999n,
        required: true
    },
    courseNumber: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'unknown'
    }
}));

module.exports = TranscriptEntries;
