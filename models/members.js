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
 * Checks capabilities of a user.
 * 
 * All users have an access property, which is a Number.  When a string
 * is passed in to cap, that string will be compared against the 
 * data/capabilities object to translate that string into a number.  The 
 * number of the user access and the number of the capabilities are compared.
 * If the user's access meets or exceeds the cooresponding capability number,
 * true is returned.  Else, false is returned. 
 * 
 * @param {String} cap capability name
 * @returns  true if the user's access meets the capability level, else false
 */
MembersSchema.methods.checkCapabilities = function(cap) {
    if(cap in capabilities) {
        return this.access >= capabilities[cap];
    }
    return false;    
};

/**
 * adds index for memberID+councilID
 * 
 * Records are typically looked up by memberID and councilID.
 */
MembersSchema.index({ memberID: 1, councilID: 1 });

module.exports = mongoose.model('Members', MembersSchema);
