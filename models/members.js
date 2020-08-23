// jshint.unstable bigint: true
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
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

/**
 * Synthesize name into "Firstname Lastname" for ease of access
 */
MembersSchema.virtual('fullNameFL').get(function() {
    return this.firstName + ' ' + this.lastName;
});

/**
 * Synthesize name into "Lastname, Firstname" for ease of access
 */
MembersSchema.virtual('fullNameFL').get(function() {
    return this.lastName + ', ' + this.firstName;
});

/**
 * Synthesize council into a string representing council name for ease 
 * of access
 */
MembersSchema.virtual('councilName').get(function() {
    return councils[this.councilID];
});

/**
 * adds index for memberID+councilID
 * 
 * Records are typically looked up by memberID and councilID.
 */
MembersSchema.index({ memberID: 1, councilID: 1 });

module.exports = mongoose.model('Members', MembersSchema);
