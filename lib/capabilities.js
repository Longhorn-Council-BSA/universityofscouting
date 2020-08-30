/**
 * capabilities module
 *
 * This module checks the capabilities of a user
 *
 * @module lib/capabilities
 */
var dataCapabilities = require('../data/capabilities');

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
 * @param {Object} user user object
 * @param {Number} user.access level of user access
 * @param {String} cap capability name
 * @returns  true if the user's access meets the capability level, else false
 */
module.exports.check = function(user, cap) {
    if(cap in dataCapabilities) {
        return user.access >= dataCapabilities[cap];
    }
    return false;    
};
