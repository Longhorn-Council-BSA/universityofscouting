/**
 * local authentication module
 *
 * This module performs authentication of users against mongodb
 *
 * @module lib/localauthentication
 */
// jshint esversion: 8
// async functions
var Members = require("../models/members");

/**
 * authenticate users with a username and password.
 *
 * Accept a memberID as a username, and case-sensitive lastName as a
 * password.
 *
 * When authentication is sucessful, a user object is passed to the done
 * function, which represents the logged in user.  The object contains
 * all known properties.
 * 
 * There is an extremely rare edge cases where the behavior is undefined.
 * If a user has the same last name and memberID as another member in a
 * different council AND both of those members are in this database, only
 * the first match will be returned.  If this ever comes to be the
 * case, a drop down box of councils should be added to the login screen
 * and the council number can be added to the search query for 
 * disambiguation.  OR even better, this login could be integrated with
 * the BSA SSO system.
 *
 * @private
 * @memberof module:lib/localauthentication
 * @param {String}   username   username to compare
 * @param {String}   password   password to compare
 * @param {Function} done       the function to call upon completion
 */
async function localAuthentication(username, password, done) {
  // reject empty or false usernames and passwords
  if (!username || !password) {
    return done(null, false, { message: "Invalid credentials." });
  }

  try {
    // match against memberID and last name, case sensitive
    var member = await Members.findOne({
      memberID: username,
      lastName: password,
    });

    if (member) {
      return done(null, member.exportObject());
    }
  } catch (err) {
    console.log(err);
  }

  // fail authenticaion if no matches are found
  return done(null, false, { message: "Invalid credentials." });
}

module.exports = localAuthentication;
