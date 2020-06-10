/**
 * deserialize user module
 *
 * This module converts data stored in the session cookie into user objects
 *
 * @module lib/serializeuser
 */

/**
 * deserialize a logged in user from session storage and reconstruct a user object.
 *
 * Since the user data is so small, the entire object was stored in the session cookie.
 * Copy the whole object back into the user object.
 *
 * @private
 * @memberof module:lib/serializeuser
 * @param {String}   data            the data stored in the session cookie
 * @param {Function} done            the function to call upon completion
 */
function deserializeUser(data, done) {
  done(null, data);
}

module.exports = deserializeUser;
