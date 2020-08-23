// jshint.unstable bigint: true
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var councils = require('../data/capabilities');
var councils = require('../data/councils');
var SchemaTypes = mongoose.Schema.Types;

MembersSchema = new mongoose.Schema({
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
});

MembersSchema.virtual('fullNameFL').get(function() {
    return this.firstName + ' ' + this.lastName;
});

MembersSchema.virtual('fullNameFL').get(function() {
    return this.lastName + ', ' + this.firstName;
});

MembersSchema.virtual('councilName').get(function() {
    return councils[this.councilID];
});

MembersSchema.methods.checkCapabilities = function(cap) {
    return this.access >= capabilities[cap];
}

MembersSchema.index({ memberID: 1, councilID: 1 });

module.exports = mongoose.model('Members', MembersSchema);
