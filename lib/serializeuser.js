/**
 * serialize user module
 *
 * This module converts user objects into data to be stored in the session cookie
 *
 * @module lib/serializeuser
 */

/**
 * serialize a logged in user for storage in the session.
 *
 * User objects are very small, and secure cookies are used.  Serialize the
 * entire user object, so that it does not need to be deserialized using
 * the database later.
 *
 * @private
 * @memberof module:lib/serializeuser
 * @param {Object}   user            user object
 * @param {Function} done            the function to call upon completion
 */
function serializeUser(user, done) {
  done(null, user);
}

module.exports = serializeUser;
